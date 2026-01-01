import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be FIRST

import app from "./app.js";
import { connectDB } from "./config/db.js";

// const PORT = 5001;
const PORT = process.env.PORT || 5001; // 👈 FIX


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
