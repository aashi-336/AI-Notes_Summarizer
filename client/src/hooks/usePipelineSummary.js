// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export const usePipelineSummary = () => {
//   const { token } = useAuth();

//   const [summary, setSummary] = useState("");
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
//         // throw new Error(data.message || "Pipeline failed");
//          throw new Error(getUserFriendlyError(data.message));
        

//       }

//       setSummary(data.summary.text);
//     } catch (err) {
//       console.error("Pipeline error:", err);
//       setError(err.message || "Failed to generate summary");
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

export const usePipelineSummary = () => {
  const { token } = useAuth();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserFriendlyError = (backendMessage) => {
  if (!backendMessage) {
    return "Unable to generate summary. Please try again.";
  }

  // 🔒 Hide pipeline internals
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
      setSummary("");

      const res = await fetch("http://localhost:5001/api/pipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔑 auth required
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

      const data = await res.json();

      console.log("PIPELINE RESPONSE:", data);

      if (!res.ok) {
       setSummary({
    success: false,
    error: getUserFriendlyError(data.message),
  });
  return;

      }

      setSummary(data.summary.text);
    } catch (err) {
      console.error("Pipeline error:", err);
      // setError(err.message || "Failed to generate summary");
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
