// utils
import { nanoid } from "nanoid";
import data from "../db.json" assert { type: "json" };
import { validationValue } from "../utils.js";
import { getArticleByRef, updateArticle } from "./Article.js";

const { orders } = data;

// VALIDATORS
function validateOrderTypes({ articleRefs, id = "fake-id" }) {
  // VALIDATE TYPES
  if (!Array.isArray(articleRefs) || !id) {
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

  // UPDATE DB
  orders.push({ id: nanoid(), articles: newOrder });

  return order;
}

export { validateOrderTypes, validateStockOrder };
export { getOrders, insertOrder };
