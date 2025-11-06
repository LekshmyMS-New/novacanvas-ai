
import express from "express";
import OpenAI from "openai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt?.trim()) return res.status(400).json({ error: "Prompt is required" });

    console.log("🎨 Original Prompt:", prompt);

    let enhancedPrompt = prompt;
    if (openai) {
      try {
        const enhancedResp = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a professional AI art prompt enhancer for image generation. " +
                "Enhance the user’s prompt with details, lighting, style, and mood.",
            },
            { role: "user", content: `Enhance this prompt: "${prompt}"` },
          ],
        });
        enhancedPrompt = enhancedResp.choices[0]?.message?.content?.trim() || prompt;
      } catch (e) {
        console.warn("⚠️ OpenAI prompt enhancement failed, using original prompt.");
      }
    }

    let imageUrl = "";
    let serviceUsed = "";
    if (openai) {
      try {
        const result = await openai.images.generate({
          model: "gpt-image-1",
          prompt: enhancedPrompt,
          size: "1024x1024",
          quality: "high",
          n: 1,
        });
        imageUrl = result.data?.[0]?.url;
        serviceUsed = "OpenAI";
      } catch (e) {
        console.warn("⚠️ OpenAI image generation failed:", e.message);
      }
    }

    if (!imageUrl && process.env.DEEPAI_API_KEY) {
      try {
        const deepaiResp = await axios.post(
          "https://api.deepai.org/api/text2img",
          new URLSearchParams({ text: enhancedPrompt }),
          { headers: { "api-key": process.env.DEEPAI_API_KEY } }
        );
        imageUrl = deepaiResp.data?.output_url;
        serviceUsed = "DeepAI";
      } catch (e) {
        console.warn("⚠️ DeepAI image generation failed:", e.message);
      }
    }

    if (!imageUrl) {
      imageUrl = `https://picsum.photos/1024/1024?random=${Date.now()}`;
      serviceUsed = "Placeholder";
    }

    console.log(`✨ Generated image via: ${serviceUsed}`);
    res.json({ imageUrl, enhancedPrompt });
  } catch (error) {
    console.error("❌ Image generation route failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
