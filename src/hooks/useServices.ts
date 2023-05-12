// types
import { TNewArticle } from "@/models/article";

// hooks
import useFetchService from "./useFetchService";

// services
import { fetchArticles, fetchNewArticle } from "@/services/services";

function useGetArticles() {
  return useFetchService(fetchArticles, { initialData: [] });
}

function useAddArticle(newArticle: TNewArticle) {
  return useFetchService<TNewArticle>(fetchNewArticle, {
    payload: newArticle,
  });
}

export { useGetArticles, useAddArticle };
