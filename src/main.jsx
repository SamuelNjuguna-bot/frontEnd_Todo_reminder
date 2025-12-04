import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient, Query } from "@tanstack/react-query";
import {CookiesProvider } from "react-cookie"
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <CookiesProvider>
                <App />
      </CookiesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
