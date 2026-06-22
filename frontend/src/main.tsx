import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/lib/global.css";
import MainRoutes from "./app/routing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainRoutes></MainRoutes>
  </StrictMode>,
);
