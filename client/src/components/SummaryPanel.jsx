import { useState } from "react";
import { usePipelineSummary } from "../hooks/usePipelineSummary.js";
import SummaryControls from "./SummaryControls";
import SummaryResult from "./SummaryResult";

const SummaryPanel = ({ fileInfo }) => {
  const [summaryType, setSummaryType] = useState("concise");
  const [language, setLanguage] = useState("en");

  const {
    summary,
    loading,
    error,
    generateSummary,
  } = usePipelineSummary();

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Generate Summary</h4>
      {/* Image Preview */}
{fileInfo?.rawUrl && fileInfo.fileType === "image" && (
  <div style={{ marginBottom: "1rem" }}>
    <h4>Uploaded Image Preview</h4>
    <img
      src={fileInfo.rawUrl}
      alt="Uploaded preview"
      style={{
        maxWidth: "100%",
        maxHeight: "300px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        objectFit: "contain",
      }}
    />
  </div>
)}

      <SummaryControls
        summaryType={summaryType}
        setSummaryType={setSummaryType}
        language={language}
        setLanguage={setLanguage}
        loading={loading}
        onGenerate={() =>
          generateSummary({ fileInfo, summaryType, language })
        }
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <SummaryResult summary={summary} />
    </div>
  );
};

export default SummaryPanel;
