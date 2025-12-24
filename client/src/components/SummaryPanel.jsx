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
