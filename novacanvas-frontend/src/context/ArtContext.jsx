import React, { createContext, useState, useEffect } from "react";
import { fetchGallery } from "../utils";

export const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchGallery();
        setImages(data);
      } finally {
        setLoadingGallery(false);
      }
    })();
  }, []);

  const addImage = (img) => setImages((prev) => [img, ...prev]);

  return (
    <ArtContext.Provider value={{ images, addImage, loadingGallery }}>
      {children}
    </ArtContext.Provider>
  );
};
