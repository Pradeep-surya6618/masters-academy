"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#187163",
    },
    secondary: {
      main: "#FEA800",
    },
  },
  typography: {
    fontFamily: "var(--font-helvetica)",
  },
});

export default theme;
