import { configureStore } from "@reduxjs/toolkit";

// reducers

const store = configureStore({
  reducer: {},
});

type TRootState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;

export default store;
export type { TRootState, TAppDispatch };
