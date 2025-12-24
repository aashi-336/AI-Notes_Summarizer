import fs from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";
import Tesseract from "tesseract.js";
import pdfPoppler from "pdf-poppler";

const unlinkAsync = promisify(fs.unlink);

/**
 * Extract text from scanned PDF using OCR
 * @param {Buffer} pdfBuffer
 * @returns {Promise<string>}
 */
export const extractPdfWithOcr = async (pdfBuffer) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-ocr-"));
  const pdfPath = path.join(tempDir, "input.pdf");

  fs.writeFileSync(pdfPath, pdfBuffer);

  const options = {
    format: "png",
    out_dir: tempDir,
    out_prefix: "page",
    page: null, // all pages
  };

  try {
    // 1️⃣ Convert PDF → images
    await pdfPoppler.convert(pdfPath, options);

    // 2️⃣ OCR each image
    const files = fs
      .readdirSync(tempDir)
      .filter((f) => f.endsWith(".png"));

    let fullText = "";

    for (const file of files) {
      const imgPath = path.join(tempDir, file);

      const {
        data: { text },
      } = await Tesseract.recognize(imgPath, "eng", {
        logger: () => {},
      });

      fullText += text + "\n";
    }

    return fullText.trim();
  } catch (err) {
    console.error("PDF OCR failed:", err);
    return "";
  } finally {
    // 🧹 Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
};
