import { nanoid } from "nanoid";

// utils
import data from "../db.json" assert { type: "json" };
import { validationValue, calculatePriceAfterTaxes } from "../utils.js";

// Business logic
import {
  getArticleByRef,
  getArticleListByRefs,
  updateArticle,
} from "./Article.js";

const { orders } = data;

// VALIDATORS
function validateOrderTypes({ articleRefs, id = "fake-id" }) {
  if (!Array.isArray(articleRefs) || id === undefined) {
    return validationValue(
      false,
      "articleRefs must be an array and id must be string"
    );
  }

  const detectedRefs = [];
  for (const artRef of articleRefs) {
    const { ref, quantity } = artRef;
    if (typeof ref !== "string" || typeof quantity !== "number" || quantity < 1)
      return validationValue(false, "Invalid articleRefs");

    const repeatedRef = detectedRefs.some((dref) => dref === ref);
    if (repeatedRef)
      return validationValue(false, "Repeated articles not allow in an order");

    detectedRefs.push(ref);
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

// ACTIONS
function getOrders() {
  const buildOrders = orders.map((order) => {
    const completeOrder = structuredClone(order);

    completeOrder.articles = order.articles.map((art) => {
      const completeArt = structuredClone(art);

      completeArt.detail.priceAfterTaxes = calculatePriceAfterTaxes(
        art.detail.priceNoTaxes,
        art.detail.taxPercentage
      );

      return completeArt;
    });

    const totalWithoutTaxes = order.articles.reduce(
      (prev, curr) => prev + curr.detail.priceNoTaxes * curr.quantity,
      0
    );

    const totalAfterTaxes = completeOrder.articles.reduce(
      (prev, curr) => prev + curr.detail.priceAfterTaxes * curr.quantity,
      0
    );

    completeOrder.totalWithoutTaxes = totalWithoutTaxes;
    completeOrder.totalAfterTaxes = totalAfterTaxes;

    return completeOrder;
  });

  return buildOrders;
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

function updateOrder(orderWithId) {
  // VALIDATE ORDER TYPES
  const { id, articleRefs } = orderWithId;
  let validation = validateOrderTypes({ id, articleRefs });
  if (!validation.ok) throw Error(validation.msg);

  // GET ORDER FROM DB
  const prevOrder = getOrderById(id);
  if (!prevOrder) throw Error("Order with specified id not found.");

  // VIRTUAL UPDATE STOCKS OF PREVIOUS ARTICLES
  const allAffectedArticleRefs = new Array(
    ...new Set(
      prevOrder.articles
        .map(({ detail }) => detail.ref)
        .concat(articleRefs.map((art) => art.ref))
    )
  );

  const restoredArticles = getArticleListByRefs(allAffectedArticleRefs).map(
    (art) => {
      const restoredArticle = structuredClone(art);
      const prevOrderArticle =
        prevOrder.articles.find(
          (art) => art.detail.ref === restoredArticle.detail.ref
        ) || getArticleByRef(restoredArticle.detail.ref);

      if (!prevOrderArticle) throw Error("Article not found");

      const newQuantity =
        prevOrderArticle.quantity ||
        articleRefs.find((newArt) => newArt.ref === art.detail.ref).quantity;

      restoredArticle.stock += newQuantity;
      return restoredArticle;
    }
  );

  // CHECK THERE IS ENOUGH STOCK TO SUPPLY A NEW ORDER AND GET NEW STOCKS
  const updatedArticlesStock = [];
  for (const newOrderArt of articleRefs) {
    const orderRefArticle = newOrderArt.ref;
    const newUpdatedArticle = restoredArticles.find(
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

  const addedOrderArticles = articleRefs.filter(
    (incomingArt) =>
      !prevOrder.articles.some(
        (prevArt) => prevArt.detail.ref === incomingArt.ref
      )
  );
  const addedOrderArticlesRefs = addedOrderArticles.map((art) => art.ref);

  const addedUpdatedArticles = restoredArticles
    .filter((restoredArt) =>
      addedOrderArticlesRefs.some(
        (additionalArtRef) => additionalArtRef === restoredArt.detail.ref
      )
    )
    .map((art) => {
      const updatedArt = structuredClone(art);
      updatedArt.stock -= articleRefs.find(
        (orderArt) => orderArt.ref === art.detail.ref
      ).quantity;
      return updatedArt;
    });

  const completedUpdatedArticlesStock = updatedArticlesStock
    .concat(newRestoredArticles)
    .concat(addedUpdatedArticles);

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
