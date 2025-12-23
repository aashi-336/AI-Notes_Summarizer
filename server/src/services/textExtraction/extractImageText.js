import Tesseract from "tesseract.js";

/**
 * Extract text from an image buffer using OCR
 * @param {Buffer} imageBuffer
 * @returns {Promise<string>}
 */
export const extractImageText = async (imageBuffer) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imageBuffer, "eng", {
      logger: () => {}, // disable logs
    });

    return text || "";
  } catch (error) {
    console.error("Image OCR failed:", error);
    throw new Error("Failed to extract text from image");
  }
};
