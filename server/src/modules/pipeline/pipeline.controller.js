import axios from "axios";
import { extractPdfText } from "../../services/textExtraction/extractPdfText.js";
import { extractImageText } from "../../services/textExtraction/extractImageText.js";
import { summarizeText } from "../../services/summarization/summarizeText.service.js";
import Note from "../notes/notes.model.js";

const SUMMARY_TYPES = ["concise", "exam", "key-points", "headings"];

export const uploadAndSummarize = async (req, res) => {
  try {
    const {
      fileUrl,
      fileType, // "pdf" | "image"
      summaryType = "concise",
      language = "en",
      fileMeta,
    } = req.body;

    /* ---------------- VALIDATION ---------------- */

    if (!["pdf", "image"].includes(fileType)) {
      return res.status(400).json({
        message: "Invalid fileType. Must be 'pdf' or 'image'",
      });
    }

    if (!fileUrl) {
      return res.status(400).json({ message: "fileUrl is required" });
    }

    if (!SUMMARY_TYPES.includes(summaryType)) {
      return res.status(400).json({ message: "Invalid summary type" });
    }

    /* ---------------- DOWNLOAD FILE ---------------- */

    const downloadUrl =
      fileType === "pdf" ? `${fileUrl}?download=1` : fileUrl;

    const fileResponse = await axios.get(downloadUrl, {
      responseType: "arraybuffer",
      timeout: 20000,
    });

    const buffer = Buffer.from(fileResponse.data);

    /* ---------------- PDF SAFETY CHECK ---------------- */

    if (fileType === "pdf") {
      const header = buffer.slice(0, 5).toString();
      console.log("📄 PDF HEADER:", header);

      if (!header.startsWith("%PDF")) {
        return res.json({
          summary: {
            text:
              "⚠️ This file is not a valid PDF or Cloudinary returned a non-PDF response.",
            type: summaryType,
            language,
          },
        });
      }
    }

    /* ---------------- EXTRACT TEXT ---------------- */

    let extractedText = "";

    if (fileType === "pdf") {
      try {
        extractedText = await extractPdfText(buffer);
      } catch (err) {
        console.error("❌ pdf-parse failed:", err);
        return res.json({
          summary: {
            text:
              "⚠️ This PDF cannot be read. It may be scanned, encrypted, or corrupted.",
            type: summaryType,
            language,
          },
        });
      }
    }

    if (fileType === "image") {
      extractedText = await extractImageText(buffer);
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return res.json({
        summary: {
          text:
            "⚠️ Unable to extract meaningful text from this document.",
          type: summaryType,
          language,
        },
      });
    }

    /* ---------------- SUMMARIZE ---------------- */

    const summaryText = await summarizeText(
      extractedText,
      summaryType,
      language
    );

    /* ---------------- SAVE ---------------- */

    if (req.userId && fileMeta) {
      await Note.create({
        userId: req.userId,
        originalFile: {
          url: fileMeta.url,
          publicId: fileMeta.publicId,
          fileType,
        },
        summary: {
          text: summaryText,
          type: summaryType,
          language,
        },
      });
    }

    return res.json({
      summary: {
        text: summaryText,
        type: summaryType,
        language,
      },
    });
  } catch (error) {
    console.error("❌ PIPELINE CRASH:", error);
    return res.status(500).json({
      message: "Summarization pipeline failed",
    });
  }
};
