import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/auth", authRoutes);
export default app;
