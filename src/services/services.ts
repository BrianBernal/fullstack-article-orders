// models
import { TArticle, TNewArticle } from "@/models/article";

// utils
import {
  SERVICE_URL,
  createFetchOptions,
  fetchJsonFromBackend,
} from "@/services/httpUtils";

function fetchArticles() {
  return fetchJsonFromBackend<TArticle[]>(SERVICE_URL.articles);
}

function fetchNewArticle(body: TNewArticle) {
  const fetchOptions = createFetchOptions("POST", body);
  return fetchJsonFromBackend<TArticle>(SERVICE_URL.articles, fetchOptions);
}

export { fetchArticles, fetchNewArticle };
