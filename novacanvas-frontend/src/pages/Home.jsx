import React from "react";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=900&q=80",
    caption: "AI Fashion",
  },
  {
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
    caption: "Dream Landscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=900&q=80",
    caption: "Futuristic Portraits",
  },
];


const Home = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #fdfaff 0%, #f1eeff 100%)",
        minHeight: "100vh",
        pt: 12,
        pb: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: "linear-gradient(90deg, #7B61FF, #FF6584)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Unleash Your Imagination with AI 🎨
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: "700px",
            mx: "auto",
            mb: 5,
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Transform your ideas into stunning visuals instantly. NovaCanvas lets you create, explore,
          and share AI-generated art that reflects your imagination.
        </Typography>

        <Button
          component={Link}
          to="/create"
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(90deg,#7B61FF,#FF6584)",
            px: 5,
            py: 1.5,
            borderRadius: "12px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 8px 20px rgba(123,97,255,0.3)",
            "&:hover": { opacity: 0.9 },
          }}
        >
          Start Creating
        </Button>
      </motion.div>

      {/* Featured Gallery Section */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: "#3a2d7d" }}>
          Featured Creations
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {sampleImages.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  background: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.src}
                  alt={item.caption}
                  sx={{ height: 280, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#3a2d7d",
                    }}
                  >
                    {item.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            mt: 12,
            background: "linear-gradient(90deg, #7B61FF, #FF6584)",
            py: 6,
            px: 3,
            borderRadius: 5,
            color: "#fff",
            maxWidth: "900px",
            mx: "auto",
            boxShadow: "0 8px 30px rgba(123,97,255,0.3)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Design the Future?
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Join creators worldwide using NovaCanvas to bring imagination to life.
          </Typography>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            sx={{
              background: "#fff",
              color: "#7B61FF",
              fontWeight: 600,
              px: 5,
              py: 1.2,
              borderRadius: 3,
              "&:hover": { background: "#f9f9ff" },
            }}
          >
            Try NovaCanvas AI
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;
