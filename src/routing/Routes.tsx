// libraries
import { BrowserRouter, Route, Routes as ReactRouter } from "react-router-dom";

// components
import Articles from "@/pages/articles/Articles";
import Orders from "@/pages/orders/Orders";
import Error404 from "@/pages/error404/Error404";
import Layout from "@/app/layout/Layout";

function Routes() {
  return (
    <BrowserRouter>
      <ReactRouter>
        <Route path="/" element={<Layout />}>
          <Route index element={<Articles />} />
          <Route path="articles" element={<Articles />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </ReactRouter>
    </BrowserRouter>
  );
}

export default Routes;
