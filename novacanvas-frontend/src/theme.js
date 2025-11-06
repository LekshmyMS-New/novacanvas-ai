// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7B61FF", 
    },
    secondary: {
      main: "#FF6584",
    },
    background: {
      default: "#f9f9ff",
      paper: "rgba(255, 255, 255, 0.7)",
    },
    text: {
      primary: "#222",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: `"Poppins", "Inter", sans-serif`,
    h3: { fontWeight: 700, letterSpacing: "-0.5px" },
    body1: { lineHeight: 1.7 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.05)",
          border: "1px solid rgba(255,255,255,0.4)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
