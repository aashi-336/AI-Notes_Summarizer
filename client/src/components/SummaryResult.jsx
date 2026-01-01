// import { useEffect, useRef, useState } from "react";
// import { saveNote } from "../services/notes";
// import { useAuth } from "../context/AuthContext";

// const SummaryResult = ({ summary, fileInfo, summaryType, language }) => {
//   const utteranceRef = useRef(null);
//   const { token } = useAuth();

//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [rate, setRate] = useState(1);
//   const [voice, setVoice] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const text = typeof summary === "string" ? summary : summary?.text || "";

//   // Safety guard
//   if (!fileInfo) {
//     return null;
//   }

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

//   const handleSave = async () => {
//     if (!token) {
//       alert("Please login to save notes");
//       return;
//     }

//     try {
//       setSaving(true);

//       await saveNote({
//         token,
//         noteData: {
//           originalFile: {
//             url: fileInfo.rawUrl,
//             publicId: fileInfo.rawPublicId,
//             fileType: fileInfo.fileType,
//           },
//           summary: {
//             text,
//             type: summaryType,
//             language,
//           },
//         },
//       });

//       alert("✅ Notes saved successfully");
//     } catch (err) {
//       alert(err.message || "Failed to save notes");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!text) {
//     return (
//       <div className="summary-result-section">
//         <div className="no-summary-message">
//           No summary generated yet. Click "Generate Summary" to begin.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="summary-result-section">
//       {/* Summary Text */}
//       <div className="summary-text-box">{text}</div>

//       {/* Audio Controls */}
//       <div className="audio-controls">
//         <button onClick={isSpeaking ? stop : speak} className="btn-play">
//           {isSpeaking ? "🔇 Stop" : "🔊 Play"}
//         </button>

//         <div className="speed-control">
//           <label className="speed-label">Speed:</label>
//           <select
//             value={rate}
//             onChange={(e) => setRate(Number(e.target.value))}
//             className="speed-select"
//           >
//             <option value={0.75}>0.75x</option>
//             <option value={1}>1x</option>
//             <option value={1.25}>1.25x</option>
//             <option value={1.5}>1.5x</option>
//           </select>
//         </div>
//       </div>

//       {/* Save Notes Button */}
//       <div className="save-section">
//         <button onClick={handleSave} disabled={saving} className="btn-save">
//           💾 {saving ? "Saving..." : "Save Notes"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SummaryResult;
import { useEffect, useRef, useState } from "react";
import { saveNote } from "../services/notes";
import { useAuth } from "../context/AuthContext";
import "../styles/summaryResult.css";

const SummaryResult = ({ summary, fileInfo, summaryType, language }) => {
  const utteranceRef = useRef(null);
  const { token } = useAuth();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState(null);
  const [saving, setSaving] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  const text = typeof summary === "string" ? summary : summary?.text || "";

  // Safety guard
  if (!fileInfo) return null;

  /* ---------------- LOAD BEST VOICE ---------------- */

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

  /* ---------------- STOP SPEECH ON CHANGE ---------------- */

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [text]);

  /* ---------------- SPEECH CONTROLS ---------------- */

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

  useEffect(() => {
    if (isSpeaking) speak();
  }, [rate]);

  /* ---------------- SAVE NOTE ---------------- */

  const handleSave = async () => {
    if (!token) {
      setSaveMessage("Please login to save notes");
      setTimeout(() => setSaveMessage(""), 3000);
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

      setSaveMessage("✅ Notes saved successfully");
    } catch {
      setSaveMessage("❌ Failed to save notes");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  /* ---------------- EMPTY STATE ---------------- */

  if (!text) {
    return (
      <div className="summary-result-section">
        <div className="no-summary-message">
          No summary generated yet. Click "Generate Summary" to begin.
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="summary-result-section">
      {/* Summary Text */}
      <div className="summary-text-box">{text}</div>

      {/* Audio Controls */}
      <div className="audio-controls">
        <button onClick={isSpeaking ? stop : speak} className="btn-play">
          {isSpeaking ? "🔇 Stop" : "🔊 Play"}
        </button>

        <div className="speed-control">
          <label className="speed-label">Speed:</label>
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="speed-select"
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </div>
      </div>

      {/* Save Section */}
      <div className="save-section">
        {saveMessage && (
          <div className="save-message">{saveMessage}</div>
        )}

        <button onClick={handleSave} disabled={saving} className="btn-save">
          💾 {saving ? "Saving..." : "Save Notes"}
        </button>
      </div>
    </div>
  );
};

export default SummaryResult;
