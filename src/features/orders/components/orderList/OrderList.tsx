// libraries
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// redux
import { fetchOrdersAction } from "../../state/orderSlice";

// components
import OrderRow from "../orderRow/OrderRow";

function OrderList() {
  const dispatch = useAppDispatch();
  const { list: orderList, status } = useAppSelector((state) => state.orders);
  console.log(orderList, status);

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, []);
  return (
    <ul role="list" className="divide-y divide-gray-300 max-w-lg mx-auto">
      {orderList.map(({ id, totalAfterTaxes, totalWithoutTaxes }) => {
        return (
          <OrderRow
            key={id}
            id={id}
            priceBeforeTaxes={totalWithoutTaxes}
            totalPrice={totalAfterTaxes}
          />
        );
      })}
    </ul>
  );
}

export default OrderList;
