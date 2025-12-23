import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/**
 * Extract text from a PDF buffer
 * @param {Buffer} pdfBuffer
 * @returns {Promise<string>}
 */
export const extractPdfText = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text || "";
  } catch (error) {
    console.error("PDF text extraction failed:", error);
    throw new Error("Failed to extract text from PDF");
  }
};
