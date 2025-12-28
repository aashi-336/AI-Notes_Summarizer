// import express from "express";
// import { createNote } from "./notes.controller.js";
// import { protect } from "../../middlewares/auth.middleware.js";

// const router = express.Router();

// router.post("/", protect, createNote);

// export default router;
import express from "express";
// import { createNote, getMyNotes, deleteNote } from "./notes.controller.js";
import {
  createNote,
  getMyNotes,
  deleteNote,
  clearDuplicateNotes
} from "./notes.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/my", protect, getMyNotes);
router.delete("/clear-duplicates", protect, clearDuplicateNotes);
router.delete("/:id", protect, deleteNote);


export default router;
