import express from "express";
import { createNote } from "./notes.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createNote);

export default router;
