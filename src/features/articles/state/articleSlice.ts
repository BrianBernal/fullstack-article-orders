import { TArticle, TEditedArticle, TNewArticle } from "@/models/article";
import { requestStatus } from "@/redux/utils";
import {
  fetchArticles,
  fetchEditArticle,
  fetchNewArticle,
} from "@/services/services";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_ARTICLES_STATE = {
  list: [] as TArticle[],
  status: requestStatus.idle,
  error: "",
  ui: {
    selectedArticleRef: "",
    isShowDetail: false,
  },
};

const fetchArticlesAction = createAsyncThunk(
  "articles/fetchArticles",
  (_, { dispatch }) => {
    dispatch(articleSlice.actions.loading());
    return fetchArticles();
  }
);

const fetchNewArticleAction = createAsyncThunk(
  "articles/fetchNewArticle",
  (newArticle: TNewArticle, { dispatch }) => {
    dispatch(articleSlice.actions.loading());
    return fetchNewArticle(newArticle);
  }
);

const fetchEditArticleAction = createAsyncThunk(
  "articles/fetchEditArticle",
  (editedArticle: TEditedArticle, { dispatch }) => {
    dispatch(articleSlice.actions.loading());
    return fetchEditArticle(editedArticle);
  }
);

const articleSlice = createSlice({
  initialState: INITIAL_ARTICLES_STATE,
  name: "articles",
  reducers: {
    loading(state) {
      state.error = "";
      state.status = requestStatus.loading;
    },
    setSelectedArticle(state, { payload }: PayloadAction<string>) {
      state.ui.selectedArticleRef = payload;
      state.ui.isShowDetail = true;
    },
    closeShowDetail(state) {
      state.ui.isShowDetail = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get article list
      .addCase(fetchArticlesAction.fulfilled, (state, { payload }) => {
        state.error = "";
        state.list = payload;
        state.status = requestStatus.succeeded;
      })
      .addCase(fetchArticlesAction.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message || "Articles not found.";
      })
      // add New article
      .addCase(fetchNewArticleAction.fulfilled, (state, { payload }) => {
        state.error = "";
        state.list.push(payload);
        state.status = requestStatus.succeeded;
      })
      .addCase(fetchNewArticleAction.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message || "Article was not saved.";
      })
      // edit article
      .addCase(fetchEditArticleAction.fulfilled, (state, { payload }) => {
        const articleIndex = state.list.findIndex(
          (art) => art.detail.ref === payload.detail.ref
        );
        state.error = "";
        state.list[articleIndex] = payload;
        state.status = requestStatus.succeeded;
      })
      .addCase(fetchEditArticleAction.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message || "Article was not edited.";
      });
  },
});

export const { setSelectedArticle, closeShowDetail } = articleSlice.actions;
export { fetchArticlesAction, fetchNewArticleAction, fetchEditArticleAction }; // async actions
export default articleSlice.reducer;
