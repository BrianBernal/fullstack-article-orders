import Header from "@/components/header/Header";
import ArticleList from "./components/articleList/ArticleList";
import NewArticle from "./components/newArticle/NewArticle";
import ErrorNotification from "./components/errorNotification/ErrorNotification";
import EditArticle from "./components/editArticle/EditArticle";

function Articles() {
  return (
    <>
      <Header title="Article List" />
      <ArticleList />
      <NewArticle />
      <EditArticle />
      <ErrorNotification />
    </>
  );
}

export default Articles;
