import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeWithGemini = async (
  text,
  summaryType = "concise",
  language = "en"
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // ✅ THIS ONE WORKS
    });

    const prompt = `
You are an AI assistant that summarizes student notes.

Summary type: ${summaryType}
Language: ${language}

Rules:
- Be clear
- Be student friendly
- No emojis
- No markdown
- Short paragraphs

Text:
${text}
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("❌ Gemini summarization error:", error.message);
    throw new Error("Gemini summarization failed");
  }
};
