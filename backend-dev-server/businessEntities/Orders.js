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

function getOrderById(id) {
  if (typeof id !== "string") throw Error("Invalid order id");
  return orders.find((order) => order.id === id);
}

function insertOrder(order) {
  // VALIDATE ORDER TYPES
  let validation = validateOrderTypes(order);
  if (!validation.ok) throw Error(validation.msg);

  // VALIDATE STOCK
  validation = validateStockOrder(order);
  if (!validation.ok) throw Error(validation.msg);

  // INSERT IN DB
  const orderArticles = order.articleRefs.map(({ ref: refOrder, quantity }) => {
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

  const successfulOrder = { id: nanoid(), articles: orderArticles };
  orders.push(successfulOrder);

  return successfulOrder;
}

function updateOrder(newOrder) {
  // VALIDATE ORDER TYPES
  const { id, articleRefs } = newOrder;
  let validation = validateOrderTypes({ id, articleRefs });
  if (!validation.ok) throw Error(validation.msg);

  // GET ORDER FROM DB
  const prevOrder = getOrderById(id);
  // console.log(prevOrder);
  if (!prevOrder) throw Error("Order with specified id not found.");

  // VIRTUAL UPDATE STOCKS OF PREVIOUS ARTICLES
  const allAffectedArticleRefs = new Array(
    ...new Set(
      prevOrder.articles
        .map(({ detail }) => detail.ref)
        .concat(articleRefs.map((art) => art.ref))
    )
  );
  const restoredPrevArticles = getArticleListByRefs(allAffectedArticleRefs).map(
    (art) => {
      const restoredArticle = structuredClone(art);
      const prevOrderArticle = prevOrder.articles.find(
        (art) => art.detail.ref === restoredArticle.detail.ref
      );
      if (!prevOrderArticle) throw Error("Article not found");
      restoredArticle.stock += prevOrderArticle.quantity;
      return restoredArticle;
    }
  );

  // CHECK THERE IS ENOUGH STOCK TO SUPPLY A NEW ORDER AND GET NEW STOCKS
  const updatedArticlesStock = [];
  for (const newOrderArt of articleRefs) {
    const orderRefArticle = newOrderArt.ref;
    const newUpdatedArticle = restoredPrevArticles.find(
      (art) => art.detail.ref === orderRefArticle
    );
    if (!newUpdatedArticle)
      throw Error(`Article with ref ${orderRefArticle} not found in the store`);

    const newOrderArticle = articleRefs.find(
      (art) => art.ref === orderRefArticle
    );

    newUpdatedArticle.stock -= newOrderArticle.quantity;
    if (newUpdatedArticle.stock < 0)
      throw Error(
        `Stock insufficient to supply ${newUpdatedArticle.detail.name} article`
      );
    updatedArticlesStock.push(newUpdatedArticle);
  }

  const removedArticleRefs = allAffectedArticleRefs.filter(
    (ref) => !articleRefs.some((art) => art.ref === ref)
  );
  const newRestoredArticles = removedArticleRefs.map((ref) => {
    const art = getArticleByRef(ref);
    const restoredArticle = structuredClone(art);
    const prevOrderArticle = prevOrder.articles.find(
      (art) => art.detail.ref === restoredArticle.detail.ref
    );
    restoredArticle.stock += prevOrderArticle.quantity;
    return restoredArticle;
  });
  const completedUpdatedArticlesStock =
    updatedArticlesStock.concat(newRestoredArticles);

  // UPDATE STOCK OF THE ARTICLES
  completedUpdatedArticlesStock.forEach((art) => {
    updateArticle(art);
  });

  // UPDATE ORDER
  const updatedOrderArticles = articleRefs.map(({ quantity, ref }) => {
    const updatedArticle = updatedArticlesStock.find(
      (art) => art.detail.ref === ref
    );
    return {
      quantity,
      detail: updatedArticle.detail,
    };
  });

  prevOrder.articles = updatedOrderArticles;

  return structuredClone(prevOrder);
}

export { validateOrderTypes, validateStockOrder }; // VALIDATORS
export { getOrders, insertOrder, updateOrder }; // ACTIONS
