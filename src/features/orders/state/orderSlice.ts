// libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// models
import { TNewOrder, TOrder } from "@/models/order";

// utils
import { requestStatus } from "@/redux/utils";
import { orderService } from "@/services/services";

const { fetchOrders, fetchNewOrder } = orderService;

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

const fetchNewOrderAction = createAsyncThunk(
  "orders/fetchNewArticles",
  (newOrder: TNewOrder, { dispatch }) => {
    dispatch(orderSlice.actions.loading());
    return fetchNewOrder(newOrder);
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
    builder
      // Get order list
      .addCase(fetchOrdersAction.fulfilled, (state, { payload }) => {
        state.error = "";
        state.list = payload;
        state.status = requestStatus.succeeded;
      })
      .addCase(fetchOrdersAction.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message || "Orders not found.";
      })
      // add new order
      .addCase(fetchNewOrderAction.fulfilled, (state, { payload }) => {
        state.error = "";
        state.list.push(payload);
        state.status = requestStatus.succeeded;
      });
  },
});

export default orderSlice.reducer;
export const { loading } = orderSlice.actions;
export { fetchOrdersAction }; // async actions
