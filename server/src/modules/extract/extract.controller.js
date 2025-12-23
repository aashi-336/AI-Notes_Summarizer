import fetch from "node-fetch";
import { extractPdfText } from "../../services/textExtraction/extractPdfText.js";
import { extractImageText } from "../../services/textExtraction/extractImageText.js";

/**
 * Controller: Extract text from uploaded file
 */
export const extractText = async (req, res) => {
  try {
    const { fileUrl, fileType } = req.body;

    if (!fileUrl || !fileType) {
      return res.status(400).json({ message: "fileUrl and fileType are required" });
    }

    // 1️⃣ Download file from Cloudinary
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return res.status(400).json({ message: "Failed to download file" });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // 2️⃣ Extract text based on file type
    let extractedText = "";

    if (fileType === "pdf") {
      extractedText = await extractPdfText(buffer);
    } else if (fileType === "image") {
      extractedText = await extractImageText(buffer);
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // 3️⃣ Return extracted text
    res.json({
      text: extractedText,
    });
  } catch (error) {
    console.error("Text extraction error:", error);
    res.status(500).json({ message: "Text extraction failed" });
  }
};
