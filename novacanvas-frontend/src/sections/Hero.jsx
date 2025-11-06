import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        background: "linear-gradient(135deg, #7B61FF 0%, #FF6584 100%)",
      }}
    >
      <Particles />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Create Art with AI ✨
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.85 }}>
          Turn your imagination into stunning visuals using NovaCanvas.
        </Typography>
        <Button
          component={Link}
          to="/create"
          variant="contained"
          size="large"
          sx={{
            px: 5,
            py: 1.5,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            "&:hover": { background: "rgba(255,255,255,0.3)" },
          }}
        >
          Generate Now
        </Button>
      </motion.div>
    </Box>
  );
};

export default Hero;
