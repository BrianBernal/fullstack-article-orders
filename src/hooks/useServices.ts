// types
import { TArticle } from "@/models/article";

// hooks
import useFetchService from "./useFetchService";

// services
import { fetchArticles, fetchNewArticle } from "@/services/services";

function useGetArticles() {
  return useFetchService(fetchArticles, { initialData: [] });
}

function useAddArticle(newArticle: TArticle) {
  return useFetchService<TArticle>(fetchNewArticle, {
    payload: newArticle,
  });
}

export { useGetArticles, useAddArticle };
