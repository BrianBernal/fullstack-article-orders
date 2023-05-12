import Header from "@/components/header/Header";
import { useAddArticle } from "@/hooks/useServices";

function Orders() {
  const { response, loading } = useAddArticle({
    stock: 5,
    detail: {
      description: "",
      name: "",
      priceNoTaxes: 3939,
      taxPercentage: 30,
    },
  });
  console.log(loading, response);

  return <Header title="List of orders" />;
}

export default Orders;
