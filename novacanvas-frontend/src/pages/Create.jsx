import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArtContext } from "../context/ArtContext";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/generate";

const Create = () => {
  const { addImage } = useContext(ArtContext);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [serviceUsed, setServiceUsed] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage("");
    setEnhancedPrompt("");
    setServiceUsed("");

    try {
      const { data } = await axios.post(API_BASE, { prompt });

      if (data?.imageUrl) {
        const finalUrl = data.imageUrl + "?t=" + Date.now();
        setImage(finalUrl);
        setEnhancedPrompt(data.enhancedPrompt || "");

        if (data.imageUrl.includes("deepai.org")) {
          setServiceUsed("DeepAI");
        } else if (data.imageUrl.includes("picsum.photos")) {
          setServiceUsed("Placeholder");
        } else {
          setServiceUsed("OpenAI");
        }

        addImage({
          prompt,
          imageUrl: finalUrl,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error(err);
      // Fallback placeholder
      const fallback = `https://picsum.photos/1024/1024?random=${Date.now()}`;
      setImage(fallback);
      setEnhancedPrompt(prompt);
      setServiceUsed("Placeholder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#f9f9ff 0%,#f1eeff 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 3, color: "#3a2d7d" }}
        >
          Create with NovaCanvas AI 🎨
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Type your imagination and let AI generate your masterpiece.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 5 }}>
          <TextField
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A futuristic city made of crystals"
            variant="outlined"
            sx={{ width: 400, background: "#fff", borderRadius: 2 }}
          />
          <Button
            onClick={handleGenerate}
            variant="contained"
            disabled={loading}
            sx={{
              px: 5,
              py: 1.5,
              background: "linear-gradient(90deg,#7B61FF,#FF6584)",
              "&:hover": { opacity: 0.9 },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
          </Button>
        </Box>

        {image && (
          <Card
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            sx={{ width: "80%", maxWidth: 700, mx: "auto", borderRadius: 4, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            <CardMedia component="img" src={image} alt="Generated Art" sx={{ objectFit: "cover", height: 500 }} />
          </Card>
        )}

        {serviceUsed && (
          <Typography
            sx={{
              mt: 2,
              fontSize: "0.9rem",
              color: serviceUsed === "OpenAI" ? "#1976d2" : serviceUsed === "DeepAI" ? "#ff9800" : "#d32f2f",
              textAlign: "center",
            }}
          >
            ⚡ Generated via: {serviceUsed}
          </Typography>
        )}

        {enhancedPrompt && (
          <Typography sx={{ mt: 1, fontSize: "0.9rem", color: "#666", textAlign: "center" }}>
            <b>AI interpreted as:</b> {enhancedPrompt}
          </Typography>
        )}
      </motion.div>
    </Box>
  );
};

export default Create;
