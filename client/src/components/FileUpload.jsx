// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { uploadToCloudinary } from "../services/cloudinary";
// import { useFile } from "../context/FileContext";
// import { useAuth } from "../context/AuthContext";

// const FileUpload = () => {
//   const navigate = useNavigate();
//   const { setFileInfo } = useFile();
//   const { token, isAuthenticated } = useAuth(); // ✅ AUTH CONTEXT

//   const [uploading, setUploading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [error, setError] = useState("");

//   const handleFile = async (file) => {
//     if (!file) return;

//     // 🔒 AUTH CHECK (STEP 2 RULE)
//     if (!isAuthenticated || !token) {
//       setError("Please login to upload files");
//       return;
//     }

//     const allowedTypes = [
//       "application/pdf",
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "image/webp",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       setError("Only PDF or image files are allowed");
//       return;
//     }

//     try {
//       setError("");
//       setUploading(true);

//       // 🔒 AUTHENTICATED UPLOAD
//       const result = await uploadToCloudinary(file, token);

//       const isPdf = file.type === "application/pdf";

//       const info = {
//         rawUrl: result.raw.secure_url,
//         rawPublicId: result.raw.public_id,
//         fileType: isPdf ? "pdf" : "image",
//       };

//       // ✅ STORE FILE INFO GLOBALLY
//       setFileInfo(info);

//       // Image preview only
//       setPreviewUrl(
//         !isPdf && result.preview ? result.preview.secure_url : null
//       );

//       navigate("/summary");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
//       <h2>Upload your document</h2>

//       <input
//         type="file"
//         onChange={(e) => handleFile(e.target.files[0])}
//       />

//       {uploading && <p>Uploading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {previewUrl && (
//         <div style={{ marginTop: "1rem" }}>
//           <button
//             onClick={() => window.open(previewUrl, "_blank")}
//             style={{ padding: "10px 14px", cursor: "pointer" }}
//           >
//             Open Image Preview 🔗
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../services/cloudinary";
import { useFile } from "../context/FileContext";
import { useAuth } from "../context/AuthContext";
import "../styles/fileupload.css";

const FileUpload = () => {
  const navigate = useNavigate();
  const { setFileInfo } = useFile();
  const { token, isAuthenticated } = useAuth();

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
    <div className="file-upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload your image</h2>
        <p className="upload-subtitle">Choose an image to generate AI-powered summaries</p>

        <div className="upload-area">
          <label htmlFor="file-input" className="upload-label">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="upload-text">Choose file</span>
          </label>
          <input
            id="file-input"
            type="file"
            onChange={(e) => handleFile(e.target.files[0])}
            className="file-input"
            accept="application/pdf,image/png,image/jpeg,image/jpg,image/webp"
            disabled={uploading}
          />
        </div>

        {uploading && (
          <div className="upload-status">
            <div className="spinner"></div>
            <p className="status-text">Uploading...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {previewUrl && (
          <div className="preview-section">
            <button
              onClick={() => window.open(previewUrl, "_blank")}
              className="preview-button"
            >
              <svg className="preview-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Open Image Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;