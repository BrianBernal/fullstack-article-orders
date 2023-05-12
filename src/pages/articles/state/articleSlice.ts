import { TArticle } from "@/models/article";
import { requestStatus } from "@/redux/utils";
import { fetchArticles } from "@/services/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_ARTICLES_STATE = {
  list: [] as TArticle[],
  status: requestStatus.idle,
  error: "",
};

const fetchArticlesAction = createAsyncThunk(
  "articles/fetchArticles",
  fetchArticles
);

const articleSlice = createSlice({
  initialState: INITIAL_ARTICLES_STATE,
  name: "articles",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesAction.fulfilled, (state, { payload }) => {
        state.error = "";
        state.status = requestStatus.succeeded;
        state.list = payload;
      })
      .addCase(fetchArticlesAction.pending, (state) => {
        state.error = "";
        state.status = requestStatus.loading;
      })
      .addCase(fetchArticlesAction.rejected, (state, action) => {
        state.error = action.error.message || "Connection Error";
        state.status = requestStatus.failed;
      });
  },
});

// export const { selectByRef } = articleSlice.actions;
export { fetchArticlesAction }; // async actions
export default articleSlice.reducer;
