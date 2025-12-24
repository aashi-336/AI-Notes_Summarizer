const SummaryResult = ({ summary }) => {
  if (!summary) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Summary</h4>
      <textarea
        value={summary}
        readOnly
        rows={6}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default SummaryResult;
