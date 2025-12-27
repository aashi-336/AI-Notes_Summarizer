export const cleanOCRText = (text) => {
  if (!text) return "";

  return text
    // Remove junk like BAR_FDQ_FUV
    .replace(/\b[A-Z_]{4,}\b/g, "")

    // Remove repeated random letters (KKKK, QQQQ)
    .replace(/([A-Z])\1{2,}/g, "")

    // Remove weird symbols but keep Indian + English text
    .replace(/[^\p{L}\p{N}\s.,!?]/gu, "")

    // Fix extra spaces
    .replace(/\s+/g, " ")
    .trim();
};
