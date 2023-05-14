// libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// models
import { TOrder } from "@/models/order";

// utils
import { requestStatus } from "@/redux/utils";
import { orderService } from "@/services/services";

const { fetchOrders } = orderService;

const INITIAL_ARTICLES_STATE = {
  list: [] as TOrder[],
  status: requestStatus.idle,
  error: "",
  ui: {
    selectedOrderId: "",
    isShowDetail: false,
  },
};

const fetchOrdersAction = createAsyncThunk(
  "orders/fetchArticles",
  (_, { dispatch }) => {
    dispatch(orderSlice.actions.loading());
    return fetchOrders();
  }
);

const orderSlice = createSlice({
  initialState: INITIAL_ARTICLES_STATE,
  name: "orders",
  reducers: {
    loading(state) {
      (state.error = ""), (state.status = requestStatus.loading);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAction.fulfilled, (state, { payload }) => {
      state.error = "";
      state.list = payload;
      state.status = requestStatus.succeeded;
    });
  },
});

export default orderSlice.reducer;
export const { loading } = orderSlice.actions;
export { fetchOrdersAction }; // async actions
