import ArticleRow from "./articleRow/ArticleRow";
import { TArticle } from "@/models/article";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchArticlesAction } from "../../state/articleSlice";
import { requestStatus } from "@/redux/utils";

function ArticleList() {
  const dispatch = useAppDispatch();
  const {
    list: articleList,
    error,
    status,
  } = useAppSelector((state) => state.articles);
  const isLoading = status === requestStatus.loading;

  useEffect(() => {
    dispatch(fetchArticlesAction());
  }, []);

  const editArticle = (art: TArticle) => {
    console.log(art);
  };

  return (
    <ul role="list" className="divide-y divide-gray-300 max-w-lg mx-auto">
      {isLoading && "loading..."}
      {error && <p>{error}</p>}
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
