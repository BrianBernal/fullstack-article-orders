import Header from "@/components/header/Header";
import ArticleList from "./articleList/ArticleList";
import NewArticle from "./newArticle/NewArticle";

function Articles() {
  return (
    <>
      <Header title="Article List" />
      <ArticleList />
      <NewArticle />
    </>
  );
}

export default Articles;
