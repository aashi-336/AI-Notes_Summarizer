
// import { useEffect, useRef, useState } from "react";

// const SummaryResult = ({ summary }) => {
//   const utteranceRef = useRef(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [rate, setRate] = useState(1);
//   const [voice, setVoice] = useState(null);

//   const text =
//     typeof summary === "string" ? summary : summary?.text || "";

//   const language =
//     typeof summary === "object" ? summary?.language || "en" : "en";

//   // Load best voice
//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = window.speechSynthesis.getVoices();

//       let best = null;

//       if (language === "hi") {
//         best = voices.find(
//           (v) => v.lang === "hi-IN" && /Google|Microsoft/i.test(v.name)
//         );
//       } else {
//         best = voices.find(
//           (v) => v.lang.startsWith("en") && /Google|Microsoft/i.test(v.name)
//         );
//       }

//       setVoice(best || voices[0] || null);
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, [language]);

//   // Stop speech when summary changes
//   useEffect(() => {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   }, [text]);

//   const speak = () => {
//     if (!text) return;

//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = rate;
//     utterance.lang = language === "hi" ? "hi-IN" : "en-US";
//     if (voice) utterance.voice = voice;

//     utterance.onend = () => setIsSpeaking(false);

//     utteranceRef.current = utterance;
//     window.speechSynthesis.speak(utterance);
//     setIsSpeaking(true);
//   };

//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   // Restart speech if speed changes
//   useEffect(() => {
//     if (isSpeaking) speak();
//   }, [rate]);

//   if (!text) {
//     return (
//       <div style={{ marginTop: "1.5rem", opacity: 0.6 }}>
//         <h4>Summary</h4>
//         <p>No summary generated yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ marginTop: "1.5rem" }}>
//       <h4>Summary</h4>

//       <p style={{ lineHeight: "1.6" }}>{text}</p>

//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={isSpeaking ? stop : speak}>
//           {isSpeaking ? "Stop 🔇" : "Play 🔊"}
//         </button>

//         <label style={{ marginLeft: "12px" }}>Speed:</label>
//         <select
//           value={rate}
//           onChange={(e) => setRate(Number(e.target.value))}
//           style={{ marginLeft: "6px" }}
//         >
//           <option value={0.75}>0.75x</option>
//           <option value={1}>1x</option>
//           <option value={1.25}>1.25x</option>
//           <option value={1.5}>1.5x</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default SummaryResult;
import { useEffect, useRef, useState } from "react";
import { saveNote } from "../services/notes";
import { useAuth } from "../context/AuthContext";

const SummaryResult = ({ summary, fileInfo, summaryType, language }) => {
  const utteranceRef = useRef(null);
  const { token } = useAuth();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState(null);
  const [saving, setSaving] = useState(false);

  const text =
    typeof summary === "string" ? summary : summary?.text || "";

  // 🔐 SAFETY GUARD (VERY IMPORTANT)
  if (!fileInfo) {
    return null;
  }

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

  const handleSave = async () => {
    if (!token) {
      alert("Please login to save notes");
      return;
    }

    try {
      setSaving(true);

      await saveNote({
        token,
        noteData: {
          originalFile: {
            url: fileInfo.rawUrl,
            publicId: fileInfo.rawPublicId,
            fileType: fileInfo.fileType,
          },
          summary: {
            text,
            type: summaryType,
            language,
          },
        },
      });

      alert("✅ Notes saved successfully");
    } catch (err) {
      alert(err.message || "Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

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

      {/* 🔊 Audio controls */}
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

      {/* 💾 SAVE NOTES */}
      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : "Save Notes 💾"}
        </button>
      </div>
    </div>
  );
};

export default SummaryResult;
