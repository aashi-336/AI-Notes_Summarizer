// // // // import { useEffect, useState } from "react";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { fetchMyNotes } from "../services/notes";
// // // // import { deleteNote } from "../services/notes";
// // // // import { clearDuplicates } from "../services/notes";

// // // // const SavedNotesPage = () => {
// // // //   const { token } = useAuth();
// // // //   const [notes, setNotes] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");

// // // //   useEffect(() => {
// // // //     const loadNotes = async () => {
// // // //       try {
// // // //         // const data = await fetchMyNotes(token);
// // // //         // setNotes(data);
// // // // //---------------------------New Version with Pagination---------------------------
// // // //         const data = await fetchMyNotes(token, page);
// // // // setNotes(data.notes);
// // // // setTotalPages(data.totalPages);

// // // //       } catch (err) {
// // // //         setError(err.message);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     loadNotes();
// // // //   }, [token, page]);
// // // //     //----------------- ✅ DELETE HANDLER (ADD HERE)-------------------------------
// // // // const handleDelete = async (noteId) => {
// // // //   if (!window.confirm("Delete this note?")) return;

// // // //   try {
// // // //     await deleteNote(token, noteId);
// // // //     setNotes((prev) => prev.filter((n) => n._id !== noteId));
// // // //   } catch (err) {
// // // //     alert(err.message);
// // // //   }
// // // // };
// // // // //---------------------------- ✅ CLEAR DUPLICATES HANDLER (ADD HERE)------------------
// // // // const handleClearDuplicates = async () => {
// // // //   if (!window.confirm("Remove duplicate notes?")) return;

// // // //   try {
// // // //     const res = await clearDuplicates(token);
// // // //     alert(`Removed ${res.removed} duplicate notes`);

// // // //     const fresh = await fetchMyNotes(token);
// // // //     setNotes(fresh);
// // // //   } catch (err) {
// // // //     alert(err.message);
// // // //   }
// // // // };

// // // //   if (loading) return <p style={{ padding: "1rem" }}>Loading notes...</p>;
// // // //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// // // //   return (
// // // //     <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
// // // //       <h2>Saved Notes</h2>
    
// // // //     <button
// // // //   onClick={handleClearDuplicates}
// // // //   style={{
// // // //     marginBottom: "1rem",
// // // //     backgroundColor: "#2563eb",
// // // //     color: "white",
// // // //     border: "none",
// // // //     padding: "8px 14px",
// // // //     borderRadius: "6px",
// // // //     cursor: "pointer",
// // // //   }}
// // // // >
// // // //   Clear Duplicates 🧹
// // // // </button>

// // // //       {notes.length === 0 && <p>No notes saved yet.</p>}

// // // //       {notes.map((note) => (
// // // //         <div
// // // //           key={note._id}
// // // //           style={{
// // // //             marginTop: "1.5rem",
// // // //             padding: "1rem",
// // // //             border: "1px solid #ddd",
// // // //             borderRadius: "8px",
// // // //           }}
          
// // // //         >
          

// // // //           <p>
// // // //             <strong>Type:</strong> {note.summary.type} |{" "}
// // // //             <strong>Language:</strong> {note.summary.language}
// // // //           </p>

// // // //           <p style={{ marginTop: "0.5rem" }}>
// // // //             {note.summary.text}
// // // //           </p>

// // // //           <a
// // // //             href={note.originalFile.url}
// // // //             target="_blank"
// // // //             rel="noreferrer"
// // // //             style={{ display: "inline-block", marginTop: "0.5rem" }}
// // // //           >
// // // //             Open Document 🔗
// // // //           </a>
// // // //               {/* 🗑️ DELETE BUTTON (ADD HERE) */}
// // // //           <div>
// // // //             <button
// // // //               onClick={() => handleDelete(note._id)}
// // // //               style={{
// // // //                 marginTop: "0.5rem",
// // // //                 backgroundColor: "#dc2626",
// // // //                 color: "white",
// // // //                 border: "none",
// // // //                 padding: "6px 12px",
// // // //                 borderRadius: "4px",
// // // //                 cursor: "pointer",
// // // //               }}
// // // //             >
// // // //               Delete 🗑️
// // // //             </button>
// // // //           </div>
// // // //           <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.7 }}>
// // // //             Saved on {new Date(note.createdAt).toLocaleString()}
// // // //           </p>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SavedNotesPage;
// // // import { useEffect, useState } from "react";
// // // import { useAuth } from "../context/AuthContext";
// // // import {
// // //   fetchMyNotes,
// // //   deleteNote,
// // //   clearDuplicates,
// // // } from "../services/notes";

// // // const SavedNotesPage = () => {
// // //   const { token } = useAuth();

// // //   const [notes, setNotes] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   // 📄 Pagination
// // //   const [page, setPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);

// // //   // 📝 Draft inputs (NO API CALL)
// // //   const [searchInput, setSearchInput] = useState("");
// // //   const [languageInput, setLanguageInput] = useState("");
// // //   const [typeInput, setTypeInput] = useState("");

// // //   // 🔍 Applied filters (API CALL)
// // //   const [search, setSearch] = useState("");
// // //   const [language, setLanguage] = useState("");
// // //   const [type, setType] = useState("");

// // //   // 🔁 Fetch notes ONLY when applied filters change
// // //   useEffect(() => {
// // //      if (!token) return; // 🔥 THIS LINE FIXES IT
// // //     const loadNotes = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const data = await fetchMyNotes(token, {
// // //           page,
// // //           search,
// // //           language,
// // //           type,
// // //         });

// // //         setNotes(data.notes);
// // //         setTotalPages(data.totalPages);
// // //       } catch (err) {
// // //         setError(err.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     loadNotes();
// // //   }, [token, page, search, language, type]);

// // //   // 🗑️ Delete note
// // //   const handleDelete = async (noteId) => {
// // //     if (!window.confirm("Delete this note?")) return;

// // //     try {
// // //       await deleteNote(token, noteId);
// // //       setNotes((prev) => prev.filter((n) => n._id !== noteId));
// // //     } catch (err) {
// // //       alert(err.message);
// // //     }
// // //   };

// // //   // 🧹 Clear duplicates
// // //   const handleClearDuplicates = async () => {
// // //     if (!window.confirm("Remove duplicate notes?")) return;

// // //     try {
// // //       const res = await clearDuplicates(token);
// // //       alert(`Removed ${res.removed} duplicate notes`);

// // //       const fresh = await fetchMyNotes(token, {
// // //         page: 1,
// // //         search,
// // //         language,
// // //         type,
// // //       });

// // //       setNotes(fresh.notes);
// // //       setTotalPages(fresh.totalPages);
// // //       setPage(1);
// // //     } catch (err) {
// // //       alert(err.message);
// // //     }
// // //   };

// // //   // 🔍 Apply filters (THIS is the key fix)
// // //   const handleApplyFilters = () => {
// // //     setSearch(searchInput);
// // //     setLanguage(languageInput);
// // //     setType(typeInput);
// // //     setPage(1);
// // //   };
// // // const handleClearFilters = () => {
// // //   setSearch("");
// // //   setLanguage("");
// // //   setType("");
// // //   setPage(1);
// // // };


// // //   if (loading) return <p style={{ padding: "1rem" }}>Loading notes...</p>;
// // //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// // //   return (
// // //     <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
// // //       <h2>Saved Notes</h2>

// // //       {/* 🔍 SEARCH + FILTERS */}
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           gap: "10px",
// // //           marginBottom: "1rem",
// // //           flexWrap: "wrap",
// // //         }}
// // //       >
// // //         <input
// // //           type="text"
// // //           placeholder="Search notes..."
// // //           value={searchInput}
// // //           onChange={(e) => setSearchInput(e.target.value)}
// // //           style={{ padding: "8px", flex: "1" }}
// // //         />

// // //         <select
// // //           value={languageInput}
// // //           onChange={(e) => setLanguageInput(e.target.value)}
// // //           style={{ padding: "8px" }}
// // //         >
// // //           <option value="">All Languages</option>
// // //           <option value="en">English</option>
// // //           <option value="hi">Hindi</option>
// // //         </select>

// // //         <select
// // //           value={typeInput}
// // //           onChange={(e) => setTypeInput(e.target.value)}
// // //           style={{ padding: "8px" }}
// // //         >
// // //           <option value="">All Types</option>
// // //           <option value="concise">Concise</option>
// // //           <option value="standard">Standard</option>
// // //           <option value="detailed">Detailed</option>
// // //         </select>

// // //         <button
// // //           onClick={handleApplyFilters}
// // //           style={{
// // //             backgroundColor: "#16a34a",
// // //             color: "white",
// // //             border: "none",
// // //             padding: "8px 14px",
// // //             borderRadius: "6px",
// // //             cursor: "pointer",
// // //           }}
// // //         >
// // //           Apply Filters 🔍
// // //         </button>
// // //         <button onClick={handleClearFilters}>
// // //   Clear Filters 
// // // </button>

// // //       </div>

// // //       {/* 🧹 CLEAR DUPLICATES */}
// // //       <button
// // //         onClick={handleClearDuplicates}
// // //         style={{
// // //           marginBottom: "1rem",
// // //           backgroundColor: "#2563eb",
// // //           color: "white",
// // //           border: "none",
// // //           padding: "8px 14px",
// // //           borderRadius: "6px",
// // //           cursor: "pointer",
// // //         }}
// // //       >
// // //         Clear Duplicates 🧹
// // //       </button>

// // //       {notes.length === 0 && <p>No notes found.</p>}

// // //       {notes.map((note) => (
// // //         <div
// // //           key={note._id}
// // //           style={{
// // //             marginTop: "1.5rem",
// // //             padding: "1rem",
// // //             border: "1px solid #ddd",
// // //             borderRadius: "8px",
// // //           }}
// // //         >
// // //           <p>
// // //             <strong>Type:</strong> {note.summary.type} |{" "}
// // //             <strong>Language:</strong> {note.summary.language}
// // //           </p>

// // //           <p style={{ marginTop: "0.5rem" }}>
// // //             {note.summary.text}
// // //           </p>

// // //           <a
// // //             href={note.originalFile.url}
// // //             target="_blank"
// // //             rel="noreferrer"
// // //             style={{ display: "inline-block", marginTop: "0.5rem" }}
// // //           >
// // //             Open Document 🔗
// // //           </a>

// // //           <div>
// // //             <button
// // //               onClick={() => handleDelete(note._id)}
// // //               style={{
// // //                 marginTop: "0.5rem",
// // //                 backgroundColor: "#dc2626",
// // //                 color: "white",
// // //                 border: "none",
// // //                 padding: "6px 12px",
// // //                 borderRadius: "4px",
// // //                 cursor: "pointer",
// // //               }}
// // //             >
// // //               Delete 🗑️
// // //             </button>
// // //           </div>

// // //           <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.7 }}>
// // //             Saved on {new Date(note.createdAt).toLocaleString()}
// // //           </p>
// // //         </div>
// // //       ))}

// // //       {/* 📄 PAGINATION */}
// // //       <div
// // //         style={{
// // //           marginTop: "2rem",
// // //           display: "flex",
// // //           justifyContent: "center",
// // //           gap: "1rem",
// // //         }}
// // //       >
// // //         <button
// // //           disabled={page === 1}
// // //           onClick={() => setPage((p) => p - 1)}
// // //         >
// // //           ◀ Prev
// // //         </button>

// // //         <span>
// // //           Page {page} of {totalPages}
// // //         </span>

// // //         <button
// // //           disabled={page === totalPages}
// // //           onClick={() => setPage((p) => p + 1)}
// // //         >
// // //           Next ▶
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SavedNotesPage;
// // import { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import {
// //   fetchMyNotes,
// //   deleteNote,
// //   clearDuplicates,
// // } from "../services/notes";
// // import "../styles/savedNotes.css";

// // const SavedNotesPage = () => {
// //   const { token, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const [notes, setNotes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   // Draft inputs (NO API CALL)
// //   const [searchInput, setSearchInput] = useState("");
// //   const [languageInput, setLanguageInput] = useState("");
// //   const [typeInput, setTypeInput] = useState("");

// //   // Applied filters (API CALL)
// //   const [search, setSearch] = useState("");
// //   const [language, setLanguage] = useState("");
// //   const [type, setType] = useState("");

// //   // Fetch notes when applied filters change
// //   useEffect(() => {
// //     if (!token) return;

// //     const loadNotes = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchMyNotes(token, {
// //           page,
// //           search,
// //           language,
// //           type,
// //         });

// //         setNotes(data.notes);
// //         setTotalPages(data.totalPages);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadNotes();
// //   }, [token, page, search, language, type]);

// //   // Delete note
// //   const handleDelete = async (noteId) => {
// //     if (!window.confirm("Delete this note?")) return;

// //     try {
// //       await deleteNote(token, noteId);
// //       setNotes((prev) => prev.filter((n) => n._id !== noteId));
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   // Clear duplicates
// //   const handleClearDuplicates = async () => {
// //     if (!window.confirm("Remove duplicate notes?")) return;

// //     try {
// //       const res = await clearDuplicates(token);
// //       alert(`Removed ${res.removed} duplicate notes`);

// //       const fresh = await fetchMyNotes(token, {
// //         page: 1,
// //         search,
// //         language,
// //         type,
// //       });

// //       setNotes(fresh.notes);
// //       setTotalPages(fresh.totalPages);
// //       setPage(1);
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   // Apply filters
// //   const handleApplyFilters = () => {
// //     setSearch(searchInput);
// //     setLanguage(languageInput);
// //     setType(typeInput);
// //     setPage(1);
// //   };

// //   // Clear filters
// //   const handleClearFilters = () => {
// //     setSearchInput("");
// //     setLanguageInput("");
// //     setTypeInput("");
// //     setSearch("");
// //     setLanguage("");
// //     setType("");
// //     setPage(1);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="saved-notes-container">
// //         <div className="loading-state">Loading notes...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="saved-notes-container">
// //         <div className="error-state">{error}</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="saved-notes-container">
// //       {/* Navbar */}
// //       <nav className="saved-notes-navbar">
// //         <div className="navbar-brand">
// //           <Link to="/Home" className="brand-link">
// //             <h2 className="brand-title">Notes Summarizer</h2>
// //           </Link>
// //         </div>

// //         <div className="navbar-actions">
// //           <Link to="/Home" className="nav-link">
// //             <button className="btn-secondary">
// //               <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
// //                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
// //               </svg>
// //               Home
// //             </button>
// //           </Link>

// //           <button onClick={logout} className="btn-logout">
// //             <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
// //             </svg>
// //             Logout
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <main className="saved-notes-main">
// //         <div className="saved-notes-content">
// //           <h1 className="page-title">Saved Notes</h1>

// //           {/* Filters Section */}
// //           <div className="filters-section">
// //             <input
// //               type="text"
// //               placeholder="Search notes..."
// //               value={searchInput}
// //               onChange={(e) => setSearchInput(e.target.value)}
// //               className="search-input"
// //             />

// //             <select
// //               value={languageInput}
// //               onChange={(e) => setLanguageInput(e.target.value)}
// //               className="filter-select"
// //             >
// //               <option value="">All Languages</option>
// //               <option value="en">English</option>
// //               <option value="hi">Hindi</option>
// //             </select>

// //             <select
// //               value={typeInput}
// //               onChange={(e) => setTypeInput(e.target.value)}
// //               className="filter-select"
// //             >
// //               <option value="">All Types</option>
// //               <option value="concise">Concise</option>
// //               <option value="standard">Standard</option>
// //               <option value="detailed">Detailed</option>
// //             </select>

// //             <button onClick={handleApplyFilters} className="btn-apply-filters">
// //               🔍 Apply Filters
// //             </button>

// //             <button onClick={handleClearFilters} className="btn-clear-filters">
// //               Clear Filters
// //             </button>
// //           </div>

// //           {/* Clear Duplicates Button */}
// //           <button onClick={handleClearDuplicates} className="btn-clear-duplicates">
// //              Clear Duplicates
// //           </button>

// //           {/* Notes List */}
// //           {notes.length === 0 ? (
// //             <div className="empty-state">
// //               <p className="empty-state-text">No notes found.</p>
// //             </div>
// //           ) : (
// //             <div className="notes-list">
// //               {notes.map((note) => (
// //                 <div key={note._id} className="note-card">
// //                   <div className="note-meta">
// //                     <div className="note-meta-item">
// //                       <span className="note-meta-label">Type:</span>
// //                       <span>{note.summary.type}</span>
// //                     </div>
// //                     <div className="note-meta-item">
// //                       <span className="note-meta-label">Language:</span>
// //                       <span>{note.summary.language}</span>
// //                     </div>
// //                   </div>

// //                   <div className="note-text">{note.summary.text}</div>

// //                   <div className="note-actions">
// //                     <a
// //                       href={note.originalFile.url}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       className="btn-open-doc"
// //                     >
// //                       🔗 Open Document
// //                     </a>

// //                     <button
// //                       onClick={() => handleDelete(note._id)}
// //                       className="btn-delete"
// //                     >
// //                        Delete
// //                     </button>
// //                   </div>

// //                   <div className="note-timestamp">
// //                     Saved on {new Date(note.createdAt).toLocaleString()}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div className="pagination">
// //               <button
// //                 disabled={page === 1}
// //                 onClick={() => setPage((p) => p - 1)}
// //                 className="btn-pagination"
// //               >
// //                 ◀ Prev
// //               </button>

// //               <span className="pagination-info">
// //                 Page {page} of {totalPages}
// //               </span>

// //               <button
// //                 disabled={page === totalPages}
// //                 onClick={() => setPage((p) => p + 1)}
// //                 className="btn-pagination"
// //               >
// //                 Next ▶
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default SavedNotesPage;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   fetchMyNotes,
//   deleteNote,
//   clearDuplicates,
// } from "../services/notes";
// import "../styles/savedNotes.css";
// import "../styles/snConfirmModal.css"; // ✅ NEW SAFE CSS

// const SavedNotesPage = () => {
//   const { token, logout } = useAuth();

//   /* ---------------- STATE ---------------- */

//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // pagination (UNCHANGED)
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // filters
//   const [searchInput, setSearchInput] = useState("");
//   const [languageInput, setLanguageInput] = useState("");
//   const [typeInput, setTypeInput] = useState("");

//   const [search, setSearch] = useState("");
//   const [language, setLanguage] = useState("");
//   const [type, setType] = useState("");

//   // confirmation modal
//   const [snConfirm, setSnConfirm] = useState(null);

//   /* ---------------- FETCH NOTES ---------------- */

//   useEffect(() => {
//     if (!token) return;

//     const loadNotes = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchMyNotes(token, {
//           page,
//           search,
//           language,
//           type,
//         });
//         setNotes(data.notes);
//         setTotalPages(data.totalPages);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadNotes();
//   }, [token, page, search, language, type]);

//   /* ---------------- CONFIRM YES ---------------- */

//   const handleSnConfirmYes = async () => {
//     try {
//       if (snConfirm.type === "delete") {
//         await deleteNote(token, snConfirm.noteId);
//         setNotes((prev) =>
//           prev.filter((n) => n._id !== snConfirm.noteId)
//         );
//       }

//       if (snConfirm.type === "clearDuplicates") {
//         const res = await clearDuplicates(token);

//         const fresh = await fetchMyNotes(token, {
//           page: 1,
//           search,
//           language,
//           type,
//         });

//         setNotes(fresh.notes);
//         setTotalPages(fresh.totalPages);
//         setPage(1);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSnConfirm(null);
//     }
//   };

//   /* ---------------- FILTER HANDLERS ---------------- */

//   const handleApplyFilters = () => {
//     setSearch(searchInput);
//     setLanguage(languageInput);
//     setType(typeInput);
//     setPage(1);
//   };

//   const handleClearFilters = () => {
//     setSearchInput("");
//     setLanguageInput("");
//     setTypeInput("");
//     setSearch("");
//     setLanguage("");
//     setType("");
//     setPage(1);
//   };

//   /* ---------------- LOADING / ERROR ---------------- */

//   if (loading) {
//     return (
//       <div className="saved-notes-container">
//         <div className="loading-state">Loading notes...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="saved-notes-container">
//         <div className="error-state">{error}</div>
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="saved-notes-container">
//       {/* ✅ SAFE CONFIRM MODAL */}
//       {snConfirm && (
//         <div className="sn-confirm-overlay">
//           <div className="sn-confirm-box">
//             <p className="sn-confirm-text">
//               {snConfirm.type === "delete"
//                 ? "Are you sure you want to delete this note?"
//                 : "Are you sure you want to clear duplicate notes?"}
//             </p>

//             <div className="sn-confirm-actions">
//               <button
//                 className="sn-btn-confirm"
//                 onClick={handleSnConfirmYes}
//               >
//                 Yes
//               </button>
//               <button
//                 className="sn-btn-cancel"
//                 onClick={() => setSnConfirm(null)}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* NAVBAR */}
//       <nav className="saved-notes-navbar">
//         <Link to="/Home" className="brand-link">
//           <h2 className="brand-title">Notes Summarizer</h2>
//         </Link>

//         <button onClick={logout} className="btn-logout">
//           Logout
//         </button>
//       </nav>

//       {/* CONTENT */}
//       <main className="saved-notes-main">
//         <div className="saved-notes-content">
//           <h1 className="page-title">Saved Notes</h1>

//           {/* FILTERS */}
//           <div className="filters-section">
//             <input
//               className="search-input"
//               placeholder="Search notes..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />

//             <select
//               className="filter-select"
//               value={languageInput}
//               onChange={(e) => setLanguageInput(e.target.value)}
//             >
//               <option value="">All Languages</option>
//               <option value="en">English</option>
//               <option value="hi">Hindi</option>
//             </select>

//             <select
//               className="filter-select"
//               value={typeInput}
//               onChange={(e) => setTypeInput(e.target.value)}
//             >
//               <option value="">All Types</option>
//               <option value="concise">Concise</option>
//               <option value="standard">Standard</option>
//               <option value="detailed">Detailed</option>
//             </select>

//             <button
//               onClick={handleApplyFilters}
//               className="btn-apply-filters"
//             >
//               Apply Filters
//             </button>

//             <button
//               onClick={handleClearFilters}
//               className="btn-clear-filters"
//             >
//               Clear Filters
//             </button>
//           </div>

//           {/* CLEAR DUPLICATES */}
//           <button
//             className="btn-clear-duplicates"
//             onClick={() =>
//               setSnConfirm({ type: "clearDuplicates" })
//             }
//           >
//             Clear Duplicates
//           </button>

//           {/* NOTES */}
//           {notes.length === 0 ? (
//             <p>No notes found.</p>
//           ) : (
//             <div className="notes-list">
//               {notes.map((note) => (
//                 <div key={note._id} className="note-card">
//                   <div className="note-text">{note.summary.text}</div>

//                   <div className="note-actions">
//                     <a
//                       href={note.originalFile.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-open-doc"
//                     >
//                       Open
//                     </a>

//                     <button
//                       className="btn-delete"
//                       onClick={() =>
//                         setSnConfirm({
//                           type: "delete",
//                           noteId: note._id,
//                         })
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ✅ PAGINATION (UNCHANGED & SAFE) */}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage((p) => p - 1)}
//                 className="btn-pagination"
//               >
//                 ◀ Prev
//               </button>

//               <span className="pagination-info">
//                 Page {page} of {totalPages}
//               </span>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage((p) => p + 1)}
//                 className="btn-pagination"
//               >
//                 Next ▶
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SavedNotesPage;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchMyNotes,
  deleteNote,
  clearDuplicates,
} from "../services/notes";
import "../styles/savedNotes.css";
import "../styles/snToast.css"; // ✅ NEW (safe, isolated)
import "../styles/snConfirm.css";

/* =====================================================
   Saved Notes Page
   ===================================================== */

const SavedNotesPage = () => {
  const { token, logout } = useAuth();

  /* ---------------- STATE ---------------- */

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // filters (draft)
  const [searchInput, setSearchInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  // filters (applied)
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");

  // confirm modal
  const [snConfirm, setSnConfirm] = useState(null);

  // success toast
  const [snToast, setSnToast] = useState("");

  /* ---------------- FETCH NOTES ---------------- */

  useEffect(() => {
    if (!token) return;

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

  /* ---------------- CONFIRM HANDLER ---------------- */

  const handleSnConfirmYes = async () => {
    try {
      if (snConfirm.type === "delete") {
        await deleteNote(token, snConfirm.noteId);
        setNotes((prev) =>
          prev.filter((n) => n._id !== snConfirm.noteId)
        );
        setSnToast("✅ Note deleted successfully");
      }

      if (snConfirm.type === "clearDuplicates") {
        const res = await clearDuplicates(token);

        const fresh = await fetchMyNotes(token, {
          page: 1,
          search,
          language,
          type,
        });

        setNotes(fresh.notes);
        setTotalPages(fresh.totalPages);
        setPage(1);

        setSnToast(`🧹 Removed ${res.removed} duplicate notes`);
      }

      setTimeout(() => setSnToast(""), 3000);
    } catch {
      setSnToast("❌ Something went wrong");
      setTimeout(() => setSnToast(""), 3000);
    } finally {
      setSnConfirm(null);
    }
  };

  /* ---------------- FILTER HANDLERS ---------------- */

  const handleApplyFilters = () => {
    setSearch(searchInput);
    setLanguage(languageInput);
    setType(typeInput);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setLanguageInput("");
    setTypeInput("");
    setSearch("");
    setLanguage("");
    setType("");
    setPage(1);
  };

  /* ---------------- LOADING / ERROR ---------------- */

  if (loading) {
    return (
      <div className="saved-notes-container">
        <div className="loading-state">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-notes-container">
        <div className="error-state">{error}</div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="saved-notes-container">
      {/* ✅ SUCCESS TOAST */}
      {snToast && <div className="sn-toast-success">{snToast}</div>}

      {/* NAVBAR */}
      <nav className="saved-notes-navbar">
        <Link to="/Home" className="brand-link">
          <h2 className="brand-title">Notes Summarizer</h2>
        </Link>

        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </nav>

      {/* ✅ CONFIRM MODAL */}
      {snConfirm && (
        <div className="sn-confirm-overlay">
          <div className="sn-confirm-box">
            <p className="sn-confirm-text">
              {snConfirm.type === "delete"
                ? "Are you sure you want to delete this note?"
                : "Are you sure you want to clear duplicate notes?"}
            </p>

            <div className="sn-confirm-actions">
              <button
                className="sn-btn-confirm"
                onClick={handleSnConfirmYes}
              >
                Yes
              </button>
              <button
                className="sn-btn-cancel"
                onClick={() => setSnConfirm(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <main className="saved-notes-main">
        <div className="saved-notes-content">
          <h1 className="page-title">Saved Notes</h1>

          {/* FILTERS */}
          <div className="filters-section">
            <input
              className="search-input"
              placeholder="Search notes..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <select
              className="filter-select"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>

            <select
              className="filter-select"
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="concise">Concise</option>
              <option value="standard">Standard</option>
              <option value="detailed">Detailed</option>
            </select>

            <button
              onClick={handleApplyFilters}
              className="btn-apply-filters"
            >
              Apply Filters
            </button>

            <button
              onClick={handleClearFilters}
              className="btn-clear-filters"
            >
              Clear Filters
            </button>
          </div>

          {/* CLEAR DUPLICATES */}
          <button
            className="btn-clear-duplicates"
            onClick={() =>
              setSnConfirm({ type: "clearDuplicates" })
            }
          >
            Clear Duplicates
          </button>

          {/* NOTES */}
          {notes.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">No notes found.</p>
            </div>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <div key={note._id} className="note-card">
                  <div className="note-text">
                    {note.summary.text}
                  </div>

                  <div className="note-actions">
                    <a
                      href={note.originalFile.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-open-doc"
                    >
                      Open
                    </a>

                    <button
                      className="btn-delete"
                      onClick={() =>
                        setSnConfirm({
                          type: "delete",
                          noteId: note._id,
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-pagination"
              >
                ◀ Prev
              </button>

              <span className="pagination-info">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-pagination"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedNotesPage;
