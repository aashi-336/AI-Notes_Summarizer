import express from "express";
import cloudinary from "../../config/cloudinary.js";

import {protect} from "../../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/signature",protect, (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: `notes/${req.userId}`,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: `notes/${req.userId}`,
  });
});
// Guest upload (no login required)
router.get("/guest-signature", (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "guest-uploads",
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: "guest-uploads",
  });
});

export default router;
