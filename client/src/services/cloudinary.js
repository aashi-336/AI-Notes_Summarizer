// client/src/services/cloudinary.js

const BACKEND_URL = "http://localhost:5001";

/**
 * Upload file to Cloudinary (guest or logged-in)
 * @param {File} file
 * @param {string|null} token
 */
export const uploadToCloudinary = async (file, token = null) => {
  // 1️⃣ Decide which signature endpoint to use
  const signatureUrl = token
    ? `${BACKEND_URL}/api/upload/signature`
    : `${BACKEND_URL}/api/upload/guest-signature`;

  // 2️⃣ Get signature from backend
  const sigRes = await fetch(signatureUrl, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!sigRes.ok) {
    throw new Error("Failed to get upload signature");
  }

  const sigData = await sigRes.json();

  // 3️⃣ Prepare Cloudinary form data
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sigData.apiKey);
  formData.append("timestamp", sigData.timestamp);
  formData.append("signature", sigData.signature);
  formData.append("folder", sigData.folder);

  // 4️⃣ Upload directly to Cloudinary
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadRes.ok) {
    throw new Error("Cloudinary upload failed");
  }

  // 5️⃣ Return uploaded file data
  return uploadRes.json(); // contains secure_url, public_id, resource_type
};
