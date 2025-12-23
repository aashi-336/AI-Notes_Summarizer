import { useState } from "react";
import { uploadToCloudinary } from "../services/cloudinary";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  // const [fileInfo, setFileInfo] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null);

  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;

    // allow only pdf or images
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

      // token = null → guest upload
      const result = await uploadToCloudinary(file, null);

    setFileInfo({
  rawUrl: result.raw.secure_url,        // 🔑 for AI later
  rawPublicId: result.raw.public_id,
  type: result.raw.resource_type,
});

setPreviewUrl(
  result.preview ? result.preview.secure_url : null
);


    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
const handleClear = () => {
  setFileInfo(null);
  setPreviewUrl(null);
  setError("");
  setUploading(false);
};


  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Upload your document</h2>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
          border: "2px dashed #888",
          padding: "2rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        Drag & drop file here
      </div>

      <input type="file" onChange={onFileChange} />

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
{fileInfo && (
  <div style={{ marginTop: "1rem" }}>
    <p>Upload successful ✅</p>
    <p>Type: {fileInfo.type}</p>

    
{previewUrl && fileInfo.type === "image" && (
  <div style={{ marginTop: "1rem" }}>
    <button
      onClick={() => window.open(previewUrl, "_blank")}
      style={{
        padding: "10px 14px",
        cursor: "pointer",
        borderRadius: "6px",
      }}
    >
      Open Image Preview 🔗
    </button>
  </div>
)}

    <div style={{ marginTop: "1rem" }}>
      <button onClick={handleClear}>Clear</button>
    </div>
  </div>
)}
    </div>
  );
};

export default FileUpload;
