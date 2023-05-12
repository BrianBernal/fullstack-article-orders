import { configureStore } from "@reduxjs/toolkit";

// reducers
import articleReducer from "@/pages/articles/state/articleSlice";

const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

type TRootState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;

export default store;
export type { TRootState, TAppDispatch };
