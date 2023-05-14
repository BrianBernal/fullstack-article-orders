// components
import Header from "@/components/header/Header";
import OrderList from "./components/orderList/OrderList";

function Orders() {
  return (
    <>
      <Header title="List of orders" />
      <OrderList />
    </>
  );
}

export default Orders;
