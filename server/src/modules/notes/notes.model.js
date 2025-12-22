import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  originalFile: {
    url: String,        // Cloudinary secure_url
    publicId: String,  // Cloudinary public_id
    fileType: {
      type: String,
      enum: ["pdf", "image"]
    }
  },

  summary: {
    text: String,
    type: {
      type: String, // exam | concise | key-points | headings
    },
    language: String
  },

  audio: {
    url: String,
    publicId: String,
    speed: Number,
    language: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Note", noteSchema);
