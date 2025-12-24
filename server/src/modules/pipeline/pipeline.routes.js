// import express from "express";
// import { uploadAndSummarize } from "./pipeline.controller.js";
// import { protect } from "../../middlewares/auth.middleware.js";

// const router = express.Router();

// // Guest user
// router.post("/", uploadAndSummarize);

// // Logged-in user (auto save)
// router.post("/save", protect, uploadAndSummarize);

// export default router;
import express from "express";
import { uploadAndSummarize } from "./pipeline.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🔒 LOGGED-IN USERS ONLY
router.post("/", protect, uploadAndSummarize);

export default router;
