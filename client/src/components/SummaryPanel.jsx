import { useState } from "react";
import { usePipelineSummary } from "../hooks/usePipelineSummary.js";
import SummaryControls from "./SummaryControls";
import SummaryResult from "./SummaryResult";

const SummaryPanel = ({ fileInfo }) => {
  const [summaryType, setSummaryType] = useState("concise");
  const [language, setLanguage] = useState("en");

  const { summary, loading, error, generateSummary } = usePipelineSummary();

  return (
    <div className="summary-panel">
      {/* Image Preview */}
      {fileInfo?.rawUrl && fileInfo.fileType === "image" && (
        <div className="image-preview-section">
          <img
            src={fileInfo.rawUrl}
            alt="Uploaded preview"
            className="preview-image"
          />
        </div>
      )}

      {/* Controls */}
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

      {/* Error */}
      {error && <div className="error-message">{error}</div>}

      {/* Summary Result */}
      <SummaryResult
        summary={summary}
        fileInfo={fileInfo}
        summaryType={summaryType}
        language={language}
      />
    </div>
  );
};

export default SummaryPanel;