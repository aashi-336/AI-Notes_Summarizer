import { summarizeText } from "../../services/summarization/summarizeText.service.js";
import Note from "../notes/notes.model.js";

/**
 * Controller: Generate summary
 */
export const generateSummary = async (req, res) => {
  try {
    const {
      text,
      summaryType = "concise",
      language = "en",
      fileMeta,
    } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // 1️⃣ Generate summary
    const summary = await summarizeText(text, summaryType, language);

    // 2️⃣ Save to DB ONLY if user is logged in
    if (req.userId && fileMeta) {
      await Note.create({
        userId: req.userId,
        originalFile: {
          url: fileMeta.url,
          publicId: fileMeta.publicId,
          fileType: fileMeta.fileType,
        },
        summary: {
          text: summary,
          type: summaryType,
          language,
        },
      });
    }

    // 3️⃣ Return response
    res.json({
      summary,
    });
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ message: "Summarization failed" });
  }
};
