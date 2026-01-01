// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useEffect } from "react";
// // import SummaryPanel from "../components/SummaryPanel";
// // import { useFile } from "../context/FileContext";

// // const SummaryPage = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const fileInfo = location.state?.fileInfo;

// //   // 🔴 HARD GUARD
// //   useEffect(() => {
// //     console.log("SUMMARY PAGE FILEINFO:", fileInfo);

// //     if (!fileInfo?.rawUrl || !fileInfo?.fileType) {
// //       console.error("Invalid fileInfo, redirecting...");
// //       navigate("/", { replace: true });
// //     }
// //   }, [fileInfo, navigate]);

// //   if (!fileInfo?.rawUrl || !fileInfo?.fileType) return null;

// //   return (
// //     <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
// //       <h2>Summary</h2>
// //       <SummaryPanel fileInfo={fileInfo} />
// //     </div>
// //   );
// // };

// // export default SummaryPage;
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import SummaryPanel from "../components/SummaryPanel";
// import { useFile } from "../context/FileContext";

// const SummaryPage = () => {
//   const navigate = useNavigate();
//   const { fileInfo } = useFile();

//   useEffect(() => {
//     console.log("SUMMARY PAGE FILEINFO:", fileInfo);

//     if (!fileInfo?.rawUrl || !fileInfo?.fileType) {
//       console.error("Invalid fileInfo, redirecting...");
//       navigate("/", { replace: true });
//     }
//   }, [fileInfo, navigate]);

//   if (!fileInfo) return null;

//   return (
//     <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
//       <h2>Summary</h2>
//       <SummaryPanel fileInfo={fileInfo} />
//     </div>
//   );
// };

// export default SummaryPage;
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SummaryPanel from "../components/SummaryPanel";
import { useFile } from "../context/FileContext";
import { useAuth } from "../context/AuthContext";
import "../styles/summary.css";

const SummaryPage = () => {
  const navigate = useNavigate();
  const { fileInfo } = useFile();
  const { logout } = useAuth();

  useEffect(() => {
    console.log("SUMMARY PAGE FILEINFO:", fileInfo);

    if (!fileInfo?.rawUrl || !fileInfo?.fileType) {
      console.error("Invalid fileInfo, redirecting...");
      navigate("/Home", { replace: true });
    }
  }, [fileInfo, navigate]);

  if (!fileInfo) return null;

  return (
    <div className="summary-container">
      {/* Navbar */}
      <nav className="summary-navbar">
        <div className="navbar-brand">
          <Link to="/Home" className="brand-link">
            <h2 className="brand-title">Notes Summarizer</h2>
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/Home" className="nav-link">
            <button className="btn-secondary">
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </button>
          </Link>

          <Link to="/saved-notes" className="nav-link">
            <button className="btn-secondary">
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Saved Notes
            </button>
          </Link>

          <button onClick={logout} className="btn-logout">
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content - Only SummaryPanel */}
      <main className="summary-main">
        <div className="summary-content">
          <SummaryPanel fileInfo={fileInfo} />
        </div>
      </main>
    </div>
  );
};

export default SummaryPage;