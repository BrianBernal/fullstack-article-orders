// models
import { TArticle, TNewArticle } from "@/models/article";

// utils
import {
  SERVICE_URL,
  createFetchOptions,
  fetchBackendJson,
} from "@/services/httpUtils";

function fetchArticles() {
  return fetchBackendJson<TArticle[]>(SERVICE_URL.articles);
}

function fetchNewArticle(body: TNewArticle) {
  const fetchOptions = createFetchOptions("POST", body);
  return fetchBackendJson<TNewArticle>(SERVICE_URL.articles, fetchOptions);
}

export { fetchArticles, fetchNewArticle };
