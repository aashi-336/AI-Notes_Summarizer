import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const usePipelineSummary = () => {
  const { token } = useAuth();

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        throw new Error(data.message || "Pipeline failed");
      }

      setSummary(data.summary.text);
    } catch (err) {
      console.error("Pipeline error:", err);
      setError(err.message || "Failed to generate summary");
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
