import express from "express";
import { generateSummary } from "./summarize.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Guest users → summary only
router.post("/", generateSummary);

// Logged-in users → summary + save
router.post("/save", protect, generateSummary);

export default router;
