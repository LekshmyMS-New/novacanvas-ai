
import React from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Loader = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #141E30 0%, #243B55 100%)",
        color: "#fff",
        boxShadow: "0 0 25px rgba(0,0,0,0.4)",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <CircularProgress color="inherit" thickness={4} size={60} />
      </motion.div>

      <Typography
        variant="h6"
        sx={{ mt: 2, letterSpacing: 1, fontFamily: "Poppins, sans-serif" }}
      >
        AI is creating your masterpiece...
      </Typography>

      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ marginTop: "10px" }}
      >
        <Typography variant="body2" sx={{ color: "#b0c4de" }}>
          Please wait while the AI paints your imagination 🎨
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Loader;
