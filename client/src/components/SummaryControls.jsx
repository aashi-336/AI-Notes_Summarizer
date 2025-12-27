const SummaryControls = ({
  summaryType,
  setSummaryType,
  language,
  setLanguage,
  onGenerate,
  loading,
}) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <select
        value={summaryType}
        onChange={(e) => setSummaryType(e.target.value)}
      >
         <option value="concise">Concise</option>
  <option value="standard">Standard</option>
  <option value="detailed">Detailed</option>
      </select>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
   <option value="en">English</option>
  <option value="hi">Hindi</option>

 
      </select>

      <button
        onClick={onGenerate}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
};

export default SummaryControls;
