import { TRootState } from "@/redux/store";

const orderEditionData = (state: TRootState) => {
  const selectedOrder = state.orders.list.find(
    (order) => order.id === state.orders.ui.selectedOrderId
  );
  return {
    selectedOrder,
    isDetailShown: state.orders.ui.isShowDetail,
  };
};

export { orderEditionData };
