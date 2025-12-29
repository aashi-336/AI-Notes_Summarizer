const SummaryControls = ({
  summaryType,
  setSummaryType,
  language,
  setLanguage,
  onGenerate,
  loading,
}) => {
  return (
    <div className="controls-section">
      <select
        value={summaryType}
        onChange={(e) => setSummaryType(e.target.value)}
        className="control-select"
      >
        <option value="concise">Concise</option>
        <option value="standard">Standard</option>
        <option value="detailed">Detailed</option>
      </select>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="control-select"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="btn-generate"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>
    </div>
  );
};

export default SummaryControls;