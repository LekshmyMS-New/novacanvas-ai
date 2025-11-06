
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { ArtProvider } from "./context/ArtContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import GalleryPage from "./pages/GalleryPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ArtProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </ArtProvider>
    </ThemeProvider>
  );
};

export default App;
