import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext";
import UserReducer from "./context/UserReducer";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
