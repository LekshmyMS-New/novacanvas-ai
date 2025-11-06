import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);


app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("✅ NovaCanvas AI Backend Running Successfully!");
});


app.use("/api/generate", generateRoute);


app.listen(PORT, () => {
  console.log(`🚀 NovaCanvas backend live on http://localhost:${PORT}`);
});
