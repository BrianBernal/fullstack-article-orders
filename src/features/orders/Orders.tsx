// components
import Header from "@/components/header/Header";
import OrderList from "./components/orderList/OrderList";
import NewOrder from "./components/newOrder/NewOrder";

function Orders() {
  return (
    <>
      <Header title="List of orders" />
      <OrderList />
      <NewOrder />
    </>
  );
}

export default Orders;
