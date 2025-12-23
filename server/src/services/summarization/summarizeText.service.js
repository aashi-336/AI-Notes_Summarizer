/**
 * Generate summary from extracted text
 * @param {string} text
 * @param {string} summaryType - concise | exam | key-points | headings
 * @param {string} language
 * @returns {Promise<string>}
 */
export const summarizeText = async (text, summaryType, language = "en") => {
  if (!text) return "";

  switch (summaryType) {
    case "exam":
      return `EXAM SUMMARY (${language}):
- Definition based explanation
- Important concepts
- Key points extracted from text

${text.slice(0, 800)}...`;

    case "key-points":
      return `KEY POINTS (${language}):
• ${text.slice(0, 200)}
• ${text.slice(200, 400)}
• ${text.slice(400, 600)}`;

    case "headings":
      return `HEADINGS (${language}):
1. Introduction
2. Core Concepts
3. Important Details
4. Summary`;

    case "concise":
    default:
      return `CONCISE SUMMARY (${language}):
${text.slice(0, 500)}...`;
  }
};
