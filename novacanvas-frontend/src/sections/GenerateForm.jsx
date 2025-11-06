import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardMedia,
  Typography,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { ArtContext } from "../context/ArtContext";
import { saveGeneratedImage } from "../utils";

const API_BASE = "http://localhost:5000/api/generate";

const CATEGORY_SUGGESTIONS = {
  Architecture: [
    "Futuristic office with neon lights",
    "Minimalist villa with glass walls",
    "Cyberpunk skyscraper skyline at sunset",
  ],
  Fashion: [
    "AI-inspired streetwear collection shoot",
    "Elegant evening gown with futuristic fabrics",
    "Digital avatar wearing sustainable fashion",
  ],
  Technology: [
    "Humanoid robot working at an AI lab",
    "AI-powered workspace with holograms",
    "Modern tech conference with neon displays",
  ],
  Nature: [
    "Sunrise over misty mountains",
    "Lush forest with glowing mushrooms",
    "Underwater coral world with bioluminescent fish",
  ],
  "Product Design": [
    "Futuristic smartphone concept",
    "Luxury smartwatch with curved screen",
    "Smart home speaker with organic design",
  ],
};

const GenerateForm = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Architecture");
  const [serviceUsed, setServiceUsed] = useState(""); // OpenAI / DeepAI / Placeholder
  const { addImage } = useContext(ArtContext);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt!");
    setLoading(true);
    setImageUrl("");
    setEnhancedPrompt("");
    setServiceUsed("");

    try {
      const { data } = await axios.post(API_BASE, { prompt });

      if (data?.imageUrl) {
        const finalUrl = data.imageUrl + "?t=" + Date.now();
        setImageUrl(finalUrl);
        setEnhancedPrompt(data.enhancedPrompt || "");

        if (data.imageUrl.includes("deepai.org")) {
          setServiceUsed("DeepAI");
        } else if (data.imageUrl.includes("picsum.photos")) {
          setServiceUsed("Placeholder");
        } else {
          setServiceUsed("OpenAI");
        }

        const newImage = {
          prompt,
          imageUrl: finalUrl,
          createdAt: new Date().toISOString(),
        };
        addImage(newImage);
        await saveGeneratedImage(newImage);
      }
    } catch (err) {
      console.error(err);
      // fallback placeholder
      const fallback = `https://picsum.photos/1024/1024?random=${Date.now()}`;
      setImageUrl(fallback);
      setEnhancedPrompt(prompt);
      setServiceUsed("Placeholder");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (text) => setPrompt(text);

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #00c6ff, #0072ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Generate Stunning AI Art
      </Typography>

      {/* Category Selection */}
      <TextField
        select
        label="Choose a category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ width: "50%", mb: 3, backgroundColor: "#fff", borderRadius: 2 }}
      >
        {Object.keys(CATEGORY_SUGGESTIONS).map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      {/* Prompt Input */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Describe your imagination (e.g. Futuristic office with neon lights)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{ width: "70%", mb: 3, backgroundColor: "#fff", borderRadius: 2 }}
      />

      {/* Suggestions */}
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1} sx={{ mb: 3 }}>
        {CATEGORY_SUGGESTIONS[category].map((suggestion, i) => (
          <Chip
            key={i}
            label={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            sx={{
              background: "#f5f7ff",
              cursor: "pointer",
              "&:hover": { background: "linear-gradient(90deg,#00c6ff,#0072ff)", color: "#fff" },
            }}
          />
        ))}
      </Stack>

      <Button
        variant="contained"
        onClick={handleGenerate}
        sx={{
          mb: 4,
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: 2,
          background: "linear-gradient(90deg, #00c6ff, #0072ff)",
          "&:hover": { background: "linear-gradient(90deg, #0072ff, #00c6ff)" },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Now"}
      </Button>

      {/* Result Display */}
      {imageUrl ? (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card
            sx={{ maxWidth: 600, borderRadius: 4, boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}
          >
            <CardMedia component="img" image={imageUrl} alt={prompt} sx={{ borderRadius: 4 }} />
          </Card>

          {serviceUsed && (
            <Typography
              sx={{
                mt: 2,
                fontSize: "0.9rem",
                color:
                  serviceUsed === "OpenAI"
                    ? "#1976d2"
                    : serviceUsed === "DeepAI"
                    ? "#ff9800"
                    : "#d32f2f",
                textAlign: "center",
              }}
            >
              ⚡ Generated via: {serviceUsed}
            </Typography>
          )}

          {enhancedPrompt && (
            <Typography sx={{ mt: 1, fontSize: "0.9rem", color: "#666" }}>
              <b>AI interpreted as:</b> {enhancedPrompt}
            </Typography>
          )}
        </motion.div>
      ) : (
        <Typography sx={{ color: "#777", mt: 4 }}>
          Enter a prompt and click "Generate Now" to create your first artwork.
        </Typography>
      )}
    </Box>
  );
};

export default GenerateForm;
