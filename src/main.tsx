// libraries
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// components
import App from "./app/App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
