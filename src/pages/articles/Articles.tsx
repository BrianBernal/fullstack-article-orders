import Header from "@/components/header/Header";
import ArticleList from "./components/articleList/ArticleList";
import NewArticle from "./components/newArticle/NewArticle";

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
