import Header from "@/components/header/Header";
import ArticleList from "./components/articleList/ArticleList";
import NewArticle from "./components/newArticle/NewArticle";
import ErrorNotification from "./components/errorNotification/ErrorNotification";

function Articles() {
  return (
    <>
      <Header title="Article List" />
      <ArticleList />
      <NewArticle />
      <ErrorNotification />
    </>
  );
}

export default Articles;
