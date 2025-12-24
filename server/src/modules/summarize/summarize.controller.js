// import { summarizeText } from "../../services/summarization/summarizeText.service.js";
// import Note from "../notes/notes.model.js";

// const SUMMARY_TYPES = ["concise", "exam", "key-points", "headings"];

// /**
//  * Controller: Generate summary
//  */
// export const generateSummary = async (req, res) => {
//   try {
//     const {
//       text,
//       summaryType = "concise",
//       language = "en",
//       fileMeta,
//     } = req.body;

//     // ✅ Validation belongs HERE
//     if (!text) {
//       return res.status(400).json({ message: "Text is required" });
//     }

//     if (!SUMMARY_TYPES.includes(summaryType)) {
//       return res.status(400).json({ message: "Invalid summary type" });
//     }

//     // 1️⃣ Generate summary
//     const summaryText = await summarizeText(text, summaryType, language);

//     // 2️⃣ Save only if logged in
//     if (req.userId && fileMeta) {
//       await Note.create({
//         userId: req.userId,
//         originalFile: {
//           url: fileMeta.url,
//           publicId: fileMeta.publicId,
//           fileType: fileMeta.fileType,
//         },
//         summary: {
//           text: summaryText,
//           type: summaryType,
//           language,
//         },
//       });
//     }

//     // ✅ Structured response (THIS is what you asked)
//     res.json({
//       summary: {
//         text: summaryText,
//         type: summaryType,
//         language,
//       },
//     });

//   } catch (error) {
//     console.error("Summarization error:", error);
//     res.status(500).json({ message: "Summarization failed" });
//   }
// };
