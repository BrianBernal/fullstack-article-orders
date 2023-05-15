// libraries
import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";

// components
import Articles from "@/features/articles/Articles";
import Orders from "@/features/orders/Orders";
import Error404 from "@/features/error404/Error404";
import Layout from "@/app/layout/Layout";

function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Articles />} />
          <Route path="articles" element={<Articles />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}

export default Routes;
