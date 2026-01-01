import axios from "axios";
import { extractImageText } from "../../services/textExtraction/extractImageText.js";
import { summarizeWithHF } from "../../services/summarization/huggingfaceSummary.service.js";
import { translateText } from "../../services/translation/translateText.service.js";
import { cleanOCRText } from "../../services/textProcessing/cleanOCRText.js";

import Note from "../notes/notes.model.js";

const SUMMARY_TYPES = ["concise", "standard", "detailed"];

// 🧠 In-memory OCR cache (key = image URL)
const ocrCache = new Map();

export const uploadAndSummarize = async (req, res) => {
  try {
    const {
      fileUrl,
      fileType, // "image"
      summaryType = "concise",
      language = "en",
      fileMeta,
    } = req.body;

    /* ---------------- VALIDATION ---------------- */

    if (fileType !== "image") {
      return res.status(400).json({
        message: "Only image summarization is enabled right now",
      });
    }

    if (!fileUrl) {
      return res.status(400).json({ message: "fileUrl is required" });
    }

    if (!SUMMARY_TYPES.includes(summaryType)) {
      return res.status(400).json({ message: "Invalid summary type" });
    }

    /* ---------------- DOWNLOAD IMAGE ---------------- */

    // console.log("⬇️ Downloading image from Cloudinary...");

    // const fileResponse = await axios.get(fileUrl, {
    //   responseType: "arraybuffer",
    //   timeout: 20000,
    // });

    // const buffer = Buffer.from(fileResponse.data);

    // console.log("✅ Image downloaded, size:", buffer.length, "bytes");
    let buffer = null;

// ⬇️ Download image ONLY if OCR is not cached
if (!ocrCache.has(fileUrl)) {
  console.log("⬇️ Downloading image from Cloudinary...");

  const fileResponse = await axios.get(fileUrl, {
    responseType: "arraybuffer",
    timeout: 20000,
  });

  buffer = Buffer.from(fileResponse.data);
}

//     /* ---------------- OCR (PYTHON SERVICE) ---------------- */

//     console.log("🧠 Sending image to OCR service...");

//     // const extractedText = await extractImageText(buffer);
//     const extractedText = await extractImageText(buffer);

// // 🧹 Clean OCR garbage
// const cleanedText = cleanOCRText(extractedText);


//     console.log("\n===== OCR OUTPUT =====\n");
//     console.log(extractedText);
//     console.log("\n======================\n");

//     if (!extractedText || extractedText.trim().length < 20) {
//       return res.json({
//         summary: {
//           text: "⚠️ Unable to extract meaningful text from this image.",
//           type: summaryType,
//           language,
//         },
//       });
//     }
/* ---------------- OCR (WITH CACHE) ---------------- */

let cleanedText;

// 🔁 Check cache first
if (ocrCache.has(fileUrl)) {
  console.log("⚡ Using cached OCR text");
  cleanedText = ocrCache.get(fileUrl);
} else {
  console.log("🧠 Sending image to OCR service...");

  const extractedText = await extractImageText(buffer);
  cleanedText = cleanOCRText(extractedText);

    console.log("\n===== OCR OUTPUT =====\n");
    console.log(cleanedText);
    console.log("\n======================\n");

   
  // 🧠 Store in cache
  ocrCache.set(fileUrl, cleanedText);
}
if (!cleanedText || cleanedText.trim().length < 20) {
  return res.json({
    summary: {
      text: "⚠️ Unable to extract meaningful text from this image.",
      type: summaryType,
      language,
    },
  });
}


/* ---------------- SUMMARIZATION ---------------- */

console.log("✂️ Summarizing extracted text...");

// 1️⃣ Always summarize in English
const englishSummary = await summarizeWithHF(cleanedText);

// 2️⃣ Translate if needed
const finalSummary =
  language === "en"
    ? englishSummary
    : await translateText(englishSummary, language);

console.log("\n===== SUMMARY OUTPUT =====\n");
console.log(finalSummary);
console.log("\n==========================\n");

/* ---------------- SAVE (OPTIONAL) ---------------- */

if (req.userId && fileMeta) {
  await Note.create({
    userId: req.userId,
    originalFile: {
      url: fileMeta.url,
      publicId: fileMeta.publicId,
      fileType: "image",
    },
    summary: {
      text: finalSummary,   // ✅ FIXED
      type: summaryType,
      language,
    },
  });
}

    /* ---------------- RESPONSE ---------------- */

    return res.json({
      summary: {
        // text: summaryText,
        text: finalSummary,

        type: summaryType,
        language,
      },
    });
  } catch (error) {
    console.error("❌ IMAGE PIPELINE CRASH:", error);
    return res.status(500).json({
      message: "Image summarization pipeline failed",
    });
  }
};
