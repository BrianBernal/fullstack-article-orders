// models
import { TArticle, TEditedArticle, TNewArticle } from "@/models/article";
import { TEditOrderPayload, TNewOrderPayload, TOrder } from "@/models/order";

// utils
import {
  SERVICE_URL,
  createFetchOptions,
  fetchJsonFromBackend,
} from "@/services/httpUtils";

// ARTICLE SERVICES
function fetchArticles() {
  return fetchJsonFromBackend<TArticle[]>(SERVICE_URL.articles);
}

function fetchNewArticle(body: TNewArticle) {
  const fetchOptions = createFetchOptions("POST", body);
  return fetchJsonFromBackend<TArticle>(SERVICE_URL.articles, fetchOptions);
}

function fetchEditArticle(body: TEditedArticle) {
  const fetchOptions = createFetchOptions("PATCH", body);
  return fetchJsonFromBackend<TArticle>(SERVICE_URL.articles, fetchOptions);
}

// ORDER SERVICES
function fetchOrders() {
  return fetchJsonFromBackend<TOrder[]>(SERVICE_URL.orders);
}

function fetchNewOrder(newOrder: TNewOrderPayload) {
  const fetchOptions = createFetchOptions("POST", newOrder);
  return fetchJsonFromBackend<TOrder>(SERVICE_URL.orders, fetchOptions);
}

function fetchEditOrder(modifiedOrder: TEditOrderPayload) {
  const fetchOptions = createFetchOptions("PATCH", modifiedOrder);
  return fetchJsonFromBackend<TOrder>(SERVICE_URL.orders, fetchOptions);
}

const articleService = {
  fetchArticles,
  fetchNewArticle,
  fetchEditArticle,
};

const orderService = {
  fetchOrders,
  fetchNewOrder,
  fetchEditOrder,
};

export { articleService, orderService };
