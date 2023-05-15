// components
import Header from "@/components/header/Header";
import OrderList from "./components/orderList/OrderList";
import OrderForm from "./components/orderForm/OrderForm";

function Orders() {
  return (
    <>
      <Header title="List of orders" />
      <OrderList />
      <OrderForm />
    </>
  );
}

export default Orders;
