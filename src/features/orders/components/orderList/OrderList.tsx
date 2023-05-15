// libraries
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// models
import { TOrderDataRow } from "@/models/order";

// redux
import { fetchOrdersAction, setSelectedOrder } from "../../state/orderSlice";

// components
import OrderRow from "../orderRow/OrderRow";

function OrderList() {
  const dispatch = useAppDispatch();
  const { list: orderList } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, []);

  const editButtonHandler = (orderData: TOrderDataRow) => {
    dispatch(setSelectedOrder(orderData.id));
  };

  return (
    <ul className="divide-y divide-gray-300 max-w-lg mx-auto">
      {orderList.map(({ id, totalAfterTaxes, totalWithoutTaxes }) => {
        const orderData = {
          id,
          priceBeforeTaxes: totalWithoutTaxes,
          totalPrice: totalAfterTaxes,
        };
        return (
          <OrderRow
            key={id}
            orderData={orderData}
            editAction={editButtonHandler}
          />
        );
      })}
    </ul>
  );
}

export default OrderList;
