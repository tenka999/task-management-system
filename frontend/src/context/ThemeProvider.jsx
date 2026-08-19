// import React, { createContext, useState, useContext } from "react";
// import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
// import { createTheme } from "@mui/material/styles";
// import { ThemeContext } from "./Context";

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [mode, setMode] = useState("light");

//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//   };

//   const theme = createTheme({
//     palette: {
//       mode,
//       primary: {
//         main: "#1976d2",
//       },
//       secondary: {
//         main: "#dc004e",
//       },
//       background: {
//         default: mode === "light" ? "#f5f5f5" : "#121212",
//         paper: mode === "light" ? "#ffffff" : "#1e1e1e",
//       },
//     },
//     typography: {
//       fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: "none",
//           },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
//     </ThemeContext.Provider>
//   );
// };
