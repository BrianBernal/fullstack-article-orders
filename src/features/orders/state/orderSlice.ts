// libraries
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// models
import { TEditOrderPayload, TNewOrderPayload, TOrder } from "@/models/order";

// utils
import { requestStatus } from "@/redux/utils";
import { orderService } from "@/services/services";

const { fetchOrders, fetchNewOrder, fetchEditOrder } = orderService;

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
  (newOrder: TNewOrderPayload, { dispatch }) => {
    dispatch(orderSlice.actions.loading());
    return fetchNewOrder(newOrder);
  }
);

const fetchEditOrderAction = createAsyncThunk(
  "orders/fetchEditArticles",
  (editedOrder: TEditOrderPayload, { dispatch }) => {
    dispatch(orderSlice.actions.loading());
    return fetchEditOrder(editedOrder);
  }
);

const orderSlice = createSlice({
  initialState: INITIAL_ARTICLES_STATE,
  name: "orders",
  reducers: {
    loading(state) {
      (state.error = ""), (state.status = requestStatus.loading);
    },
    setSelectedOrder(state, { payload }: PayloadAction<string>) {
      (state.ui.selectedOrderId = payload), (state.ui.isShowDetail = true);
    },
    closeShowDetail(state) {
      state.ui.isShowDetail = false;
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
      })
      .addCase(fetchNewOrderAction.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message || "The nwe order was not saved.";
      })
      //edit order
      .addCase(fetchEditOrderAction.fulfilled, (state, { payload }) => {
        const orderIndex = state.list.findIndex(
          (order) => order.id === payload.id
        );
        state.list[orderIndex] = payload;
        state.error = "";
        state.status = requestStatus.succeeded;
      })
      .addCase(fetchEditOrderAction.rejected, (state, action) => {
        state.status = requestStatus.failed;
        state.error = action.error.message || "The edition was not saved.";
      });
  },
});

export default orderSlice.reducer;
export const { loading, closeShowDetail, setSelectedOrder } =
  orderSlice.actions;
export { fetchOrdersAction, fetchNewOrderAction, fetchEditOrderAction }; // async actions
