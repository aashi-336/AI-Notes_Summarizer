import express from "express";
import { extractText } from "./extract.controller.js";

const router = express.Router();

// Guest + logged-in both allowed
router.post("/", extractText);

export default router;
