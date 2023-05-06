import { nanoid } from "nanoid";
import data from "../db.json" assert { type: "json" };
import { validateTypes } from "../utils.js";
const { articles } = data;

// VALIDATORS
function validateArticle({ stock = 0, detail = {} }) {
  const validation = { ok: false, msg: "" };
  if (stock < 0 || typeof detail !== "object") {
    validation.msg = "Wrong article object type.";
    return validation;
  }

  const {
    name,
    description,
    priceNoTaxes,
    taxPercentage,
    ref = "id is optional in validation",
  } = detail;
  const typeValues = {
    strings: {
      name,
      description,
      ref,
    },
    numbers: {
      priceNoTaxes,
      taxPercentage,
      stock,
    },
  };
  const areValidValues = validateTypes(typeValues);
  if (!areValidValues) {
    validation.msg = "Invalid article values.";
    return validation;
  }

  validation.ok = true;
  validation.msg = "Successful article validation.";
  return validation;
}

function isRepeatedNameArticle(name) {
  const isRepeated = articles.some((article) => article.detail.name === name);
  return isRepeated;
}

// ACTIONS
function getArticles() {
  return articles;
}

function insertNewArticle(article) {
  const articleValidation = validateArticle(article);
  if (!articleValidation.ok) throw Error(articleValidation.msg);

  // UPDATE DB
  const { stock, detail } = article;
  const newArticle = {
    stock,
    detail: {
      ref: nanoid(),
      ...detail,
    },
  };
  articles.push(newArticle);
}

export { validateArticle, isRepeatedNameArticle }; // VALIDATORS
export { getArticles, insertNewArticle }; // ACTIONS
