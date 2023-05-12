import { useGetArticles } from "@/hooks/useServices";
import ArticleRow from "./articleRow/ArticleRow";
import { TArticle } from "@/models/article";

function ArticleList() {
  const { response, loading } = useGetArticles();
  const { data: articles } = response;

  const editArticle = (art: TArticle) => {
    console.log(art);
  };

  return (
    <ul role="list" className="divide-y divide-gray-300 max-w-lg mx-auto">
      {loading && "loading..."}
      {!response.ok && !loading && <p>Articles not found.</p>}
      {articles?.map((art) => {
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
