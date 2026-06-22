import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/lib/global.css";
import MainRoutes from "./app/routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainRoutes />
    </QueryClientProvider>
  </StrictMode>,
);
