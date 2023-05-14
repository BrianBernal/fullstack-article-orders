import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchOrdersAction } from "../../state/orderSlice";

function OrderList() {
  const dispatch = useAppDispatch();
  const { list: orderList, status } = useAppSelector((state) => state.orders);
  console.log(orderList, status);

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, []);
  return <div>list</div>;
}

export default OrderList;
