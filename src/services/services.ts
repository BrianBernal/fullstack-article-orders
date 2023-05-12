// models

// utils
import { TArticle } from "@/models/article";
import {
  SERVICE_URL,
  createFetchOptions,
  fetchBackendJson,
} from "@/services/httpUtils";

function fetchArticles() {
  return fetchBackendJson<TArticle[]>(SERVICE_URL.articles);
}

function fetchNewArticle(body: TArticle) {
  const fetchOptions = createFetchOptions("POST", body);
  return fetchBackendJson<TArticle>(SERVICE_URL.articles, fetchOptions);
}

export { fetchArticles, fetchNewArticle };
