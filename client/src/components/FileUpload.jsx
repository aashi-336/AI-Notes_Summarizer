import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../services/cloudinary";
import { useFile } from "../context/FileContext";
import { useAuth } from "../context/AuthContext";

const FileUpload = () => {
  const navigate = useNavigate();
  const { setFileInfo } = useFile();
  const { token, isAuthenticated } = useAuth(); // ✅ AUTH CONTEXT

  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;

    // 🔒 AUTH CHECK (STEP 2 RULE)
    if (!isAuthenticated || !token) {
      setError("Please login to upload files");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF or image files are allowed");
      return;
    }

    try {
      setError("");
      setUploading(true);

      // 🔒 AUTHENTICATED UPLOAD
      const result = await uploadToCloudinary(file, token);

      const isPdf = file.type === "application/pdf";

      const info = {
        rawUrl: result.raw.secure_url,
        rawPublicId: result.raw.public_id,
        fileType: isPdf ? "pdf" : "image",
      };

      // ✅ STORE FILE INFO GLOBALLY
      setFileInfo(info);

      // Image preview only
      setPreviewUrl(
        !isPdf && result.preview ? result.preview.secure_url : null
      );

      navigate("/summary");
    } catch (err) {
      console.error(err);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Upload your document</h2>

      <input
        type="file"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {previewUrl && (
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => window.open(previewUrl, "_blank")}
            style={{ padding: "10px 14px", cursor: "pointer" }}
          >
            Open Image Preview 🔗
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
