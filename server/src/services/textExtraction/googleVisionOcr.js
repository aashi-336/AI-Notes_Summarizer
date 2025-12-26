import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const googleVisionOCR = async (imageUrl) => {
  try {
    const [result] = await client.textDetection(imageUrl);

    const detections = result.textAnnotations;
    if (!detections || detections.length === 0) {
      return "";
    }

    // Full extracted text (best for handwritten notes)
    return detections[0].description || "";
  } catch (err) {
    console.error("Google Vision OCR error:", err);
    throw new Error("Failed to extract text from image");
  }
};
