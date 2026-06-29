import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/lib/global.css";
import MainRoutes from "./app/routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./app/theme";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <MainRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
