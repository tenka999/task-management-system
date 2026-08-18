import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeProvider";
import routes from "./routes";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
