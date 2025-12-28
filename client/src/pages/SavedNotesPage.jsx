// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { fetchMyNotes } from "../services/notes";
// import { deleteNote } from "../services/notes";
// import { clearDuplicates } from "../services/notes";

// const SavedNotesPage = () => {
//   const { token } = useAuth();
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadNotes = async () => {
//       try {
//         // const data = await fetchMyNotes(token);
//         // setNotes(data);
// //---------------------------New Version with Pagination---------------------------
//         const data = await fetchMyNotes(token, page);
// setNotes(data.notes);
// setTotalPages(data.totalPages);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadNotes();
//   }, [token, page]);
//     //----------------- ✅ DELETE HANDLER (ADD HERE)-------------------------------
// const handleDelete = async (noteId) => {
//   if (!window.confirm("Delete this note?")) return;

//   try {
//     await deleteNote(token, noteId);
//     setNotes((prev) => prev.filter((n) => n._id !== noteId));
//   } catch (err) {
//     alert(err.message);
//   }
// };
// //---------------------------- ✅ CLEAR DUPLICATES HANDLER (ADD HERE)------------------
// const handleClearDuplicates = async () => {
//   if (!window.confirm("Remove duplicate notes?")) return;

//   try {
//     const res = await clearDuplicates(token);
//     alert(`Removed ${res.removed} duplicate notes`);

//     const fresh = await fetchMyNotes(token);
//     setNotes(fresh);
//   } catch (err) {
//     alert(err.message);
//   }
// };

//   if (loading) return <p style={{ padding: "1rem" }}>Loading notes...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
//       <h2>Saved Notes</h2>
    
//     <button
//   onClick={handleClearDuplicates}
//   style={{
//     marginBottom: "1rem",
//     backgroundColor: "#2563eb",
//     color: "white",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   }}
// >
//   Clear Duplicates 🧹
// </button>

//       {notes.length === 0 && <p>No notes saved yet.</p>}

//       {notes.map((note) => (
//         <div
//           key={note._id}
//           style={{
//             marginTop: "1.5rem",
//             padding: "1rem",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//           }}
          
//         >
          

//           <p>
//             <strong>Type:</strong> {note.summary.type} |{" "}
//             <strong>Language:</strong> {note.summary.language}
//           </p>

//           <p style={{ marginTop: "0.5rem" }}>
//             {note.summary.text}
//           </p>

//           <a
//             href={note.originalFile.url}
//             target="_blank"
//             rel="noreferrer"
//             style={{ display: "inline-block", marginTop: "0.5rem" }}
//           >
//             Open Document 🔗
//           </a>
//               {/* 🗑️ DELETE BUTTON (ADD HERE) */}
//           <div>
//             <button
//               onClick={() => handleDelete(note._id)}
//               style={{
//                 marginTop: "0.5rem",
//                 backgroundColor: "#dc2626",
//                 color: "white",
//                 border: "none",
//                 padding: "6px 12px",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Delete 🗑️
//             </button>
//           </div>
//           <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.7 }}>
//             Saved on {new Date(note.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SavedNotesPage;
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchMyNotes,
  deleteNote,
  clearDuplicates,
} from "../services/notes";

const SavedNotesPage = () => {
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 📝 Draft inputs (NO API CALL)
  const [searchInput, setSearchInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  // 🔍 Applied filters (API CALL)
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");

  // 🔁 Fetch notes ONLY when applied filters change
  useEffect(() => {
     if (!token) return; // 🔥 THIS LINE FIXES IT
    const loadNotes = async () => {
      try {
        setLoading(true);
        const data = await fetchMyNotes(token, {
          page,
          search,
          language,
          type,
        });

        setNotes(data.notes);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [token, page, search, language, type]);

  // 🗑️ Delete note
  const handleDelete = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await deleteNote(token, noteId);
      setNotes((prev) => prev.filter((n) => n._id !== noteId));
    } catch (err) {
      alert(err.message);
    }
  };

  // 🧹 Clear duplicates
  const handleClearDuplicates = async () => {
    if (!window.confirm("Remove duplicate notes?")) return;

    try {
      const res = await clearDuplicates(token);
      alert(`Removed ${res.removed} duplicate notes`);

      const fresh = await fetchMyNotes(token, {
        page: 1,
        search,
        language,
        type,
      });

      setNotes(fresh.notes);
      setTotalPages(fresh.totalPages);
      setPage(1);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔍 Apply filters (THIS is the key fix)
  const handleApplyFilters = () => {
    setSearch(searchInput);
    setLanguage(languageInput);
    setType(typeInput);
    setPage(1);
  };
const handleClearFilters = () => {
  setSearch("");
  setLanguage("");
  setType("");
  setPage(1);
};


  if (loading) return <p style={{ padding: "1rem" }}>Loading notes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      <h2>Saved Notes</h2>

      {/* 🔍 SEARCH + FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search notes..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: "8px", flex: "1" }}
        />

        <select
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <select
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Types</option>
          <option value="concise">Concise</option>
          <option value="standard">Standard</option>
          <option value="detailed">Detailed</option>
        </select>

        <button
          onClick={handleApplyFilters}
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Apply Filters 🔍
        </button>
        <button onClick={handleClearFilters}>
  Clear Filters 
</button>

      </div>

      {/* 🧹 CLEAR DUPLICATES */}
      <button
        onClick={handleClearDuplicates}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Clear Duplicates 🧹
      </button>

      {notes.length === 0 && <p>No notes found.</p>}

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Type:</strong> {note.summary.type} |{" "}
            <strong>Language:</strong> {note.summary.language}
          </p>

          <p style={{ marginTop: "0.5rem" }}>
            {note.summary.text}
          </p>

          <a
            href={note.originalFile.url}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", marginTop: "0.5rem" }}
          >
            Open Document 🔗
          </a>

          <div>
            <button
              onClick={() => handleDelete(note._id)}
              style={{
                marginTop: "0.5rem",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete 🗑️
            </button>
          </div>

          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.7 }}>
            Saved on {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      {/* 📄 PAGINATION */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ◀ Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default SavedNotesPage;
