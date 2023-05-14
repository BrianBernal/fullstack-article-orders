import { TRootState } from "@/redux/store";

const articleEditionData = (state: TRootState) => {
  const selectedArticle = state.articles.list.find(
    (art) => art.detail.ref === state.articles.ui.selectedArticleRef
  );
  return {
    selectedArticle,
    isDetailShown: state.articles.ui.isShowDetail,
  };
};

export { articleEditionData };
