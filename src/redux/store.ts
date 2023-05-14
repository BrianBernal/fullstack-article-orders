import { configureStore } from "@reduxjs/toolkit";

// reducers
import articleReducer from "@/features/articles/state/articleSlice";
import orderReducer from "@/features/orders/state/orderSlice";

const store = configureStore({
  reducer: {
    articles: articleReducer,
    orders: orderReducer,
  },
});

type TRootState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;

export default store;
export type { TRootState, TAppDispatch };
