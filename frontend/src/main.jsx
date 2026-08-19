import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { PrimeReactProvider } from "primereact/api";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
const config = {
  ripple: true,
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
