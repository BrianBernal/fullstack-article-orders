// utils
import { nanoid } from "nanoid";
import data from "../db.json" assert { type: "json" };
import { validationValue } from "../utils.js";
import {
  getArticleByRef,
  getArticleListByRefs,
  updateArticle,
  validateArticle,
} from "./Article.js";

const { orders } = data;

// VALIDATORS
function validateOrderTypes({ articleRefs, id = "fake-id" }) {
  // VALIDATE TYPES
  if (!Array.isArray(articleRefs) || id === undefined) {
    return validationValue(
      false,
      "articleRefs must be an array and id must be string"
    );
  }
  for (const artRef of articleRefs) {
    const { ref, quantity } = artRef;
    if (typeof ref !== "string" || typeof quantity !== "number" || quantity < 1)
      return validationValue(false, "Invalid articleRefs");
  }
  return validationValue(true, "Successful order types validation");
}

function validateStockOrder({ articleRefs = [] }) {
  for (const artRef of articleRefs) {
    const { ref, quantity } = artRef;
    const articleDB = getArticleByRef(ref);
    if (!articleDB)
      return validationValue(false, `article with ref ${ref} not found.`);

    if (articleDB.stock < quantity)
      return validationValue(
        false,
        `There is not enough stock of article with ref ${ref}`
      );
  }
  return validationValue(true, "Successful stock order validation");
}

function validateOrderStructureAgainstDB(order) {
  const { id = "", articles } = order;
  if (!id || !Array.isArray(articles))
    return validationValue(false, "Invalid order types");

  for (const article of articles) {
    if (article.quantity <= 0)
      return validationValue(false, "Articles must be major to 0");
    const artValidation = validateArticle({
      stock: article.quantity,
      detail: article.detail,
    });
    if (!artValidation.ok) return artValidation;
  }

  return validationValue(true, "Order structure is correct.");
}

// ACTIONS
function getOrders() {
  return orders;
}

function insertOrder(order) {
  // VALIDATE ORDER TYPES
  let validation = validateOrderTypes(order);
  if (!validation.ok) throw Error(validation.msg);

  // VALIDATE STOCK
  validation = validateStockOrder(order);
  if (!validation.ok) throw Error(validation.msg);

  // INSERT IN DB
  const newOrder = order.articleRefs.map(({ ref: refOrder, quantity }) => {
    const currentArticle = getArticleByRef(refOrder);

    // UPDATE STOCK
    const updatedArticle = structuredClone(currentArticle);
    updatedArticle.stock -= quantity;
    updateArticle(updatedArticle);

    // CREATE NEW DETAIL ORDER
    const { detail: detailDB } = currentArticle;
    const { ref, name, description, priceNoTaxes, taxPercentage } = detailDB;
    const newDetail = {
      ref,
      name,
      description,
      priceNoTaxes,
      taxPercentage,
    };
    return {
      quantity,
      detail: newDetail,
    };
  });

  orders.push({ id: nanoid(), articles: newOrder });

  return order;
}

function updateOrder(newOrder) {
  // VALIDATE ORDER TYPES
  let validation = validateOrderStructureAgainstDB(newOrder);
  if (!validation.ok) throw Error(validation.msg);

  // GET ORDER FROM DB
  const { articles: newOrderArticles = [], id } = newOrder;
  const previousOrderIndex = orders.findIndex((order) => order.id === id);
  if (previousOrderIndex < 0) {
    throw Error("Order with the indicated id not found.");
  }
  const previousOrder = orders[previousOrderIndex];

  const restoredArticlesStock = getArticleListByRefs(
    previousOrder.articles.map((article) => article.detail.ref)
  ).map((articleFromDB) => {
    const prevArticle = previousOrder.articles.find(
      (art) => art.detail.ref === articleFromDB.detail.ref
    );
    const restoredArticle = structuredClone(articleFromDB);
    restoredArticle.stock += prevArticle.quantity;

    return restoredArticle;
  });

  const newArticleStockAvailability = newOrderArticles.map((art) => {
    const newArticleRef = art.detail.ref;
    const updatedArticle =
      restoredArticlesStock.find(
        ({ detail }) => detail.ref === newArticleRef
      ) || getArticleByRef(newArticleRef);
    if (!updatedArticle) throw "Bad request in the article of the order";

    return updatedArticle;
  });

  // UPDATE STOCKS OF AFFECTED ARTICLES
  const updatedArticles = [];
  for (const newOrderArt of newOrderArticles) {
    const { quantity, detail: newDetail } = newOrderArt;
    const articleInStock = newArticleStockAvailability.find(
      ({ detail }) => detail.ref === newDetail.ref
    );
    // CHECK THERE IS ENOUGH STOCK TO SUPPLY A NEW ORDER
    if (articleInStock.stock < quantity)
      throw Error(`Not enough stock to the new quantity of ${newDetail.name}`);

    // CREATE NEW UPDATED ARTICLE
    const updatedStockArticle = structuredClone(articleInStock);
    updatedStockArticle.stock -= quantity;
    updatedArticles.push(updatedStockArticle);
  }

  // UPDATE DATABASE
  updatedArticles.forEach((art) => updateArticle(art));
  previousOrder.articles = newOrderArticles;
  return newOrder;
}

export { validateOrderTypes, validateStockOrder }; // VALIDATORS
export { getOrders, insertOrder, updateOrder }; // ACTIONS
