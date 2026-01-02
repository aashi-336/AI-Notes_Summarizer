// // import { useState } from "react";
// // import { useAuth } from "../context/AuthContext";

// // export const usePipelineSummary = () => {
// //   const { token } = useAuth();

// //   const [summary, setSummary] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const getUserFriendlyError = (backendMessage) => {
// //   if (!backendMessage) {
// //     return "Unable to generate summary. Please try again.";
// //   }

// //   // 🔒 Hide pipeline internals
// //   if (
// //     backendMessage.toLowerCase().includes("pipeline") ||
// //     backendMessage.toLowerCase().includes("no text") ||
// //     backendMessage.toLowerCase().includes("ocr")
// //   ) {
// //     return "No readable text was found in this image.";
// //   }

// //   return "Unable to generate summary from this file.";
// // };

// //   const generateSummary = async ({ fileInfo, summaryType, language }) => {
// //     try {
// //       setLoading(true);
// //       setError("");
// //       setSummary("");

// //       const res = await fetch("http://localhost:5001/api/pipeline", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`, // 🔑 auth required
// //         },
// //         body: JSON.stringify({
// //           fileUrl: fileInfo.rawUrl,
// //           fileType: fileInfo.fileType,
// //           summaryType,
// //           language,
// //           fileMeta: {
// //             url: fileInfo.rawUrl,
// //             publicId: fileInfo.rawPublicId,
// //             fileType: fileInfo.fileType,
// //           },
// //         }),
// //       });

// //       const data = await res.json();

// //       console.log("PIPELINE RESPONSE:", data);

// //       if (!res.ok) {
// //         // throw new Error(data.message || "Pipeline failed");
// //          throw new Error(getUserFriendlyError(data.message));
        

// //       }

// //       setSummary(data.summary.text);
// //     } catch (err) {
// //       console.error("Pipeline error:", err);
// //       setError(err.message || "Failed to generate summary");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return {
    
// //     summary,
// //     loading,
// //     error,
// //     generateSummary,
// //   };
// // };
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export const usePipelineSummary = () => {
//   const { token } = useAuth();

//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const getUserFriendlyError = (backendMessage) => {
//   if (!backendMessage) {
//     return "Unable to generate summary. Please try again.";
//   }

//   // 🔒 Hide pipeline internals
//   if (
//     backendMessage.toLowerCase().includes("pipeline") ||
//     backendMessage.toLowerCase().includes("no text") ||
//     backendMessage.toLowerCase().includes("ocr")
//   ) {
//     return "No readable text was found in this image.";
//   }

//   return "Unable to generate summary from this file.";
// };

//   const generateSummary = async ({ fileInfo, summaryType, language }) => {
//     try {
//       setLoading(true);
//       setError("");
//       setSummary("");

//       const res = await fetch("http://localhost:5001/api/pipeline", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // 🔑 auth required
//         },
//         body: JSON.stringify({
//           fileUrl: fileInfo.rawUrl,
//           fileType: fileInfo.fileType,
//           summaryType,
//           language,
//           fileMeta: {
//             url: fileInfo.rawUrl,
//             publicId: fileInfo.rawPublicId,
//             fileType: fileInfo.fileType,
//           },
//         }),
//       });

//       const data = await res.json();

//       console.log("PIPELINE RESPONSE:", data);

//       if (!res.ok) {
//        setSummary({
//     success: false,
//     error: getUserFriendlyError(data.message),
//   });
//   return;

//       }

//       setSummary(data.summary.text);
//     } catch (err) {
//       console.error("Pipeline error:", err);
//       // setError(err.message || "Failed to generate summary");
//       setError(err.message || "Failed to generate summary");
// setSummary(null);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
    
//     summary,
//     loading,
//     error,
//     generateSummary,
//   };
// };
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePipelineSummary = () => {
  const { token } = useAuth();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserFriendlyError = (backendMessage) => {
    if (!backendMessage) {
      return "Unable to generate summary. Please try again.";
    }

    if (
      backendMessage.toLowerCase().includes("pipeline") ||
      backendMessage.toLowerCase().includes("no text") ||
      backendMessage.toLowerCase().includes("ocr")
    ) {
      return "No readable text was found in this image.";
    }

    return "Unable to generate summary from this file.";
  };

  const generateSummary = async ({ fileInfo, summaryType, language }) => {
    try {
      setLoading(true);
      setError("");
      setSummary(null);

      const res = await fetch(`${API_BASE_URL}/api/pipeline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileUrl: fileInfo.rawUrl,
          fileType: fileInfo.fileType,
          summaryType,
          language,
          fileMeta: {
            url: fileInfo.rawUrl,
            publicId: fileInfo.rawPublicId,
            fileType: fileInfo.fileType,
          },
        }),
      });

      // ✅ Safely handle non-JSON errors
      let data;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Server returned an invalid response");
      }

      if (!res.ok) {
        throw new Error(getUserFriendlyError(data?.message));
      }

      setSummary(data.summary.text);
    } catch (err) {
      console.error("Pipeline error:", err);
      setError(err.message || "Failed to generate summary");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    loading,
    error,
    generateSummary,
  };
};
