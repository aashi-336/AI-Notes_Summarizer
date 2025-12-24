// const BACKEND_URL = "http://localhost:5001";

// export const uploadToCloudinary = async (file, token = null) => {
//   const signatureUrl = token
//     ? `${BACKEND_URL}/api/upload/signature`
//     : `${BACKEND_URL}/api/upload/guest-signature`;

//   const sigRes = await fetch(signatureUrl, {
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   if (!sigRes.ok) throw new Error("Failed to get upload signature");

//   const sigData = await sigRes.json();

//   const isPdf = file.type === "application/pdf";
//   const resourceType = isPdf ? "raw" : "image";
  

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("api_key", sigData.apiKey);
//   formData.append("timestamp", sigData.timestamp);
//   formData.append("signature", sigData.signature);
//   formData.append("folder", sigData.folder);
//   formData.append("resource_type", resourceType);

//   const uploadRes = await fetch(
//     `https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   if (!uploadRes.ok) throw new Error("Cloudinary upload failed");

//   const raw = await uploadRes.json();

// const previewUrl = raw.secure_url;

// return {
//   raw,
//   preview: isPdf ? null : { secure_url: raw.secure_url },
// };

// };
const BACKEND_URL = "http://localhost:5001";

/**
 * Upload file to Cloudinary (AUTH REQUIRED)
 * @param {File} file
 * @param {string} token - JWT token
 */
export const uploadToCloudinary = async (file, token) => {
  if (!token) {
    throw new Error("User must be logged in to upload files");
  }

  // 🔒 Get signed upload params from backend
  const sigRes = await fetch(`${BACKEND_URL}/api/upload/signature`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!sigRes.ok) {
    throw new Error("Failed to get upload signature");
  }

  const sigData = await sigRes.json();

  const isPdf = file.type === "application/pdf";
  const resourceType = isPdf ? "raw" : "image";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sigData.apiKey);
  formData.append("timestamp", sigData.timestamp);
  formData.append("signature", sigData.signature);
  formData.append("folder", sigData.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadRes.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const raw = await uploadRes.json();

  return {
    raw,
    preview: isPdf ? null : { secure_url: raw.secure_url },
  };
};
