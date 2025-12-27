// const SummaryResult = ({ summary }) => {
//   if (!summary) return null;

//   return (
//     <div style={{ marginTop: "1rem" }}>
//       <h4>Summary</h4>
//       <textarea
//         value={summary}
//         readOnly
//         rows={6}
//         style={{ width: "100%" }}
//       />
//     </div>
//   );
// };

// export default SummaryResult;
import { useEffect, useRef, useState } from "react";

const SummaryResult = ({ summary }) => {
  const utteranceRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState(null);

  const text =
    typeof summary === "string" ? summary : summary?.text || "";

  const language =
    typeof summary === "object" ? summary?.language || "en" : "en";

  // Load best voice
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      let best = null;

      if (language === "hi") {
        best = voices.find(
          (v) => v.lang === "hi-IN" && /Google|Microsoft/i.test(v.name)
        );
      } else {
        best = voices.find(
          (v) => v.lang.startsWith("en") && /Google|Microsoft/i.test(v.name)
        );
      }

      setVoice(best || voices[0] || null);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [language]);

  // Stop speech when summary changes
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [text]);

  const speak = () => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    if (voice) utterance.voice = voice;

    utterance.onend = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Restart speech if speed changes
  useEffect(() => {
    if (isSpeaking) speak();
  }, [rate]);

  if (!text) {
    return (
      <div style={{ marginTop: "1.5rem", opacity: 0.6 }}>
        <h4>Summary</h4>
        <p>No summary generated yet.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4>Summary</h4>

      <p style={{ lineHeight: "1.6" }}>{text}</p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={isSpeaking ? stop : speak}>
          {isSpeaking ? "Stop 🔇" : "Play 🔊"}
        </button>

        <label style={{ marginLeft: "12px" }}>Speed:</label>
        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          style={{ marginLeft: "6px" }}
        >
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
        </select>
      </div>
    </div>
  );
};

export default SummaryResult;
