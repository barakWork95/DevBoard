import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/lib/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>Welcome To DevBoard !</div>
  </StrictMode>
);
