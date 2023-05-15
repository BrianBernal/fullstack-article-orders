// components
import Header from "@/components/header/Header";
import OrderList from "./components/orderList/OrderList";
import NewOrder from "./components/newOrder/NewOrder";
import EditOrder from "./components/editOrder/EditOrder";

function Orders() {
  return (
    <>
      <Header title="List of orders" />
      <OrderList />
      <NewOrder />
      <EditOrder />
    </>
  );
}

export default Orders;
