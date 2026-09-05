import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { PrimeReactProvider } from "primereact/api";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toast";
const config = {
  ripple: true,
};

// const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
