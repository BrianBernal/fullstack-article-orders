// libraries
import jsonServer from "json-server";

// utils
import data from "./db.json" assert { type: "json" };
import { calculatePriceAfterTaxes } from "./utils.js";

// Business logic
import {
  deleteArticle,
  getArticles,
  insertNewArticle,
  isRepeatedNameArticle,
  updateArticle,
  validateArticle,
} from "./businessEntities/Article.js";
import {
  insertOrder,
  validateOrderTypes,
  validateStockOrder,
} from "./businessEntities/Orders.js";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { orders } = data;
const defaultDBError = "Database not updated";

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/articles", (_req, res) => {
  return res.json(getArticles());
});

server.post("/articles", (req, res) => {
  const { name, description, priceNoTaxes, taxPercentage, stock } = req.body;
  const newArticle = {
    stock,
    detail: {
      name,
      description,
      priceNoTaxes,
      taxPercentage,
    },
  };

  // VALIDATE TYPES
  const areValidTypes = validateArticle(newArticle);
  if (!areValidTypes.ok) return res.sendStatus(400);

  // VALIDATE REPEATED ARTICLE
  if (isRepeatedNameArticle(name))
    return res
      .status(400)
      .send({ error: "There is an article with this name" });

  // UPDATE DB
  let insertedArticle;
  try {
    insertedArticle = insertNewArticle(newArticle);
  } catch (error) {
    return res.status(400).send(error);
  }

  // SUCCESSFUL RESPONSE
  const priceAfterTaxes = calculatePriceAfterTaxes(priceNoTaxes, taxPercentage);
  newArticle.detail.priceAfterTaxes = priceAfterTaxes;
  newArticle.detail.ref = insertedArticle.detail.ref;
  return res.send(newArticle);
});

server.patch("/articles", (req, res) => {
  const { ref, name, description, priceNoTaxes, taxPercentage, stock } =
    req.body;
  const modifiedArticle = {
    stock,
    detail: {
      ref,
      name,
      description,
      priceNoTaxes,
      taxPercentage,
    },
  };

  // VALIDATE TYPES
  const areValidTypes = validateArticle(modifiedArticle);
  if (!areValidTypes.ok) return res.sendStatus(400);

  // UPDATE DB
  try {
    updateArticle(modifiedArticle);
  } catch (error) {
    return res.status(400).send(error.message || defaultDBError);
  }

  // SUCCESSFUL RESPONSE
  const priceAfterTaxes = calculatePriceAfterTaxes(priceNoTaxes, taxPercentage);
  modifiedArticle.detail.priceAfterTaxes = priceAfterTaxes;
  return res.send(modifiedArticle);
});

server.delete("/articles/:ref", (req, res) => {
  const { ref } = req.params;
  if (!ref) return res.sendStatus(400);

  try {
    deleteArticle(ref);
  } catch (error) {
    return res.status(400).send(error.message || defaultDBError);
  }
  return res.send({ ok: true, message: "Article deleted successfully." });
});

server.get("/orders", (_req, res) => {
  return res.json(orders);
});

server.post("/orders", (req, res) => {
  const order = req.body;
  // VALIDATE ORDER TYPES
  let validation = validateOrderTypes(order);
  if (!validation.ok) return res.status(400).send(validation.msg);
  // VALIDATE STOCK
  validation = validateStockOrder(order);
  if (!validation.ok) return res.status(417).send(validation.msg);

  // INSERT ORDER
  let insertedOrder;
  try {
    insertedOrder = insertOrder(order);
  } catch (error) {
    return res.status(400).send(error.message || defaultDBError);
  }

  // SUCCESSFUL RESPONSE
  return res.send({ createdOrder: insertedOrder });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON server is running on port 3000");
});
