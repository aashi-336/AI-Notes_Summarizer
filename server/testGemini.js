import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const run = async () => {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello in one sentence.",
  });

  console.log("✅ GEMINI RESPONSE:", res.text);
};

run();
