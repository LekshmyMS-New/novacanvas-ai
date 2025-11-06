import React, { useContext } from "react";
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { ArtContext } from "../context/ArtContext";

const GalleryPage = () => {
  const { images, loadingGallery } = useContext(ArtContext);

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        minHeight: "100vh",
        background: "linear-gradient(180deg,#f1eeff 0%,#fff 100%)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 6,
          color: "#3a2d7d",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        AI Art Gallery 🖼️
      </Typography>

      {loadingGallery ? (
        <Typography
          align="center"
          sx={{
            opacity: 0.7,
            mt: 4,
            fontStyle: "italic",
            color: "#555",
          }}
        >
          Loading your gallery...
        </Typography>
      ) : images.length === 0 ? (
        <Typography
          align="center"
          sx={{
            opacity: 0.6,
            mt: 4,
            fontSize: "1.1rem",
            color: "#555",
          }}
        >
          No creations yet — go generate something magical ✨
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {images.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  background: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  image={img.imageUrl}
                  alt={img.prompt}
                  sx={{
                    height: 300,
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default GalleryPage;
