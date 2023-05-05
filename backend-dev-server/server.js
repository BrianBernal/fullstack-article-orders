// libraries
import jsonServer from "json-server";
import { nanoid } from "nanoid";

// utils
import data from "./db.json" assert { type: "json" };
import {
  calculatePriceAfterTaxes,
  normalizeNumber,
  validateArticleTypes,
} from "./utils.js";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { articles, orders } = data;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/articles", (_req, res) => {
  return res.json(articles);
});

server.post("/articles", (req, res) => {
  const { name, description, priceNoTaxes, taxPercentage, stock } = req.body;
  const receiveArticle = {
    name,
    description,
    priceNoTaxes,
    taxPercentage,
    stock,
  };

  // VALIDATE TYPES
  const areValidTypes = validateArticleTypes(receiveArticle);
  if (!areValidTypes) return res.sendStatus(400);

  // VALIDATE REPEATED ARTICLE
  const repeatedArticle = articles.some((article) => article.name === name);
  if (repeatedArticle)
    return res
      .status(400)
      .send({ error: "There is an article with this name" });

  // SUCCESSFUL RESPONSE
  const newArticle = {
    ref: nanoid(),
    ...receiveArticle,
  };
  articles.push(newArticle);
  const priceAfterTaxes = calculatePriceAfterTaxes(priceNoTaxes, taxPercentage);

  return res.send({
    ...newArticle,
    priceAfterTaxes: normalizeNumber(priceAfterTaxes),
  });
});

server.patch("/articles", (req, res) => {
  const { name, description, priceNoTaxes, taxPercentage, stock, ref } =
    req.body;
  const receiveArticle = {
    name,
    description,
    priceNoTaxes,
    taxPercentage,
    stock,
  };

  // VALIDATE TYPES
  const areValidTypes = validateArticleTypes(receiveArticle);
  if (!areValidTypes || !ref) return res.sendStatus(400);

  // VALIDATE ARTICLE EXISTENCE
  const indexToModify = articles.findIndex((article) => article.ref === ref);
  if (indexToModify < 0) return res.sendStatus(404);

  // SUCCESSFUL RESPONSE
  const modifiedArticle = {
    ref,
    ...receiveArticle,
  };

  articles[indexToModify] = modifiedArticle;
  const priceAfterTaxes = calculatePriceAfterTaxes(priceNoTaxes, taxPercentage);

  return res.send({
    ...modifiedArticle,
    priceAfterTaxes: normalizeNumber(priceAfterTaxes),
  });
});

server.delete("/articles/:ref", (req, res) => {
  const { ref } = req.params;
  if (!ref) return res.sendStatus(400);

  const articleIndex = articles.findIndex((article) => article.ref === ref);
  if (articleIndex < 0) return res.sendStatus(404);

  articles.splice(articleIndex, 1);
  return res.send({ ok: true, message: "Article deleted successfully." });
});

server.get("/orders", (_req, res) => {
  return res.json(orders);
});

server.post("/orders", (req, res) => {
  const { articles: articlesRequest } = req.body;

  // VALIDATE ORDER TYPES
  if (!Array.isArray(articlesRequest)) return res.sendStatus(400);

  for (const article of articlesRequest) {
    const { name, description, priceNoTaxes, taxPercentage, ref } =
      article.detail;
    if (typeof ref !== "string") return res.sendStatus(400);

    const { quantity } = article;
    const receiveArticle = {
      name,
      description,
      priceNoTaxes,
      taxPercentage,
    };
    const isValidArticle = validateArticleTypes({
      ...receiveArticle,
      stock: quantity,
    });
    if (!isValidArticle) return res.sendStatus(400);
  }

  // VALIDATE STOCK
  for (const article of articlesRequest) {
    const { ref, name } = article.detail;
    const { quantity } = article;
    const articleIndex = articles.findIndex((article) => article.ref === ref);

    if (articleIndex < 0) return res.sendStatus(404);
    if (quantity > articles[articleIndex].stock)
      return res.status(417).send({ error: `Insufficient stock of ${name}` });
  }

  // UPDATE STOCK
  for (const article of articlesRequest) {
    const { ref } = article.detail;
    const { quantity } = article;
    const articleIndex = articles.findIndex((article) => article.ref === ref);

    articles[articleIndex].stock -= quantity;
  }

  // SUCCESSFUL RESPONSE
  const newOrder = {
    id: nanoid(),
    articlesRequest,
  };
  orders.push(newOrder);
  return res.send(newOrder);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON server is running on port 3000");
});
