import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import { protect } from "./middlewares/auth.middleware.js";
import notesRoutes from "./modules/notes/notes.routes.js";
import uploadRoutes from "./modules/notes/upload.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "You are authorized", userId: req.userId });
});


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/upload", uploadRoutes);

export default app;
