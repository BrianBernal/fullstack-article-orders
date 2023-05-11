// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles
import "./App.css";

// components
import Layout from "./layout/Layout";
import Articles from "@/pages/articles/Articles";
import Orders from "@/pages/orders/Orders";
import Error404 from "@/pages/error404/Error404";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Articles />} />
            <Route path="articles" element={<Articles />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
