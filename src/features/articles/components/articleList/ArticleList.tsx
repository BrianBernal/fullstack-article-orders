// libraries
import { useEffect } from "react";

// models
import { TArticle } from "@/models/article";

// redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { requestStatus } from "@/redux/utils";
import {
  fetchArticlesAction,
  setSelectedArticle,
} from "../../state/articleSlice";

// components
import ArticleRow from "./articleRow/ArticleRow";

function ArticleList() {
  const dispatch = useAppDispatch();
  const { list: articleList, status } = useAppSelector(
    (state) => state.articles
  );
  const isLoading = status === requestStatus.loading;

  useEffect(() => {
    dispatch(fetchArticlesAction());
  }, []);

  const editArticle = (art: TArticle) => {
    dispatch(setSelectedArticle(art.detail.ref));
  };

  return (
    <ul role="list" className="divide-y divide-gray-300 max-w-lg mx-auto">
      {isLoading && articleList.length === 0 && "loading..."}
      {articleList.map((art) => {
        return (
          <ArticleRow
            key={art.detail.ref}
            article={art}
            editAction={editArticle}
          />
        );
      })}
    </ul>
  );
}

export default ArticleList;
