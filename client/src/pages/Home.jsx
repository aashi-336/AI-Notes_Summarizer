// // import { Link } from "react-router-dom";
// // import FileUpload from "../components/FileUpload";
// // import { useAuth } from "../context/AuthContext";

// // const Home = () => {
// //   const { isAuthenticated, logout } = useAuth();

// //   return (
// //     <div style={{ padding: "1rem" }}>
// //       {/* 🔝 NAVBAR */}
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "flex-end",
// //           gap: "10px",
// //           marginBottom: "1.5rem",
// //         }}
// //       >
// //         {!isAuthenticated ? (
// //           <>
// //             <Link to="/login">
// //               <button>Login</button>
// //             </Link>

// //             <Link to="/signup">
// //               <button>Signup</button>
// //             </Link>
// //           </>
// //         ) : (
// //  <>
// //     <Link to="/saved-notes">
// //       <button>Saved Notes</button>
// //     </Link>

// //     <button onClick={logout}>Logout</button>
// //   </>
// //           // <button onClick={logout}>Logout</button>
// //         )}
// //       </div>

// //       {/* 📤 UPLOAD SECTION */}
// //       <FileUpload />
// //     </div>
// //   );
// // };

// // export default Home;
// import { Link } from "react-router-dom";
// import FileUpload from "../components/FileUpload";
// import { useAuth } from "../context/AuthContext";

// const Home = () => {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <div style={{ padding: "1rem" }}>
//       {/* 🔝 NAVBAR */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: "10px",
//           marginBottom: "1.5rem",
//         }}
//       >
//         {!isAuthenticated ? (
//           <>
//             <Link to="/login">
//               <button>Login</button>
//             </Link>

//             <Link to="/signup">
//               <button>Signup</button>
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/saved-notes">
//               <button>Saved Notes</button>
//             </Link>

//             <button onClick={logout}>Logout</button>
//           </>
//         )}
//       </div>

//       {/* 📤 UPLOAD SECTION */}
//       <FileUpload />
//     </div>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="home-container">
      {/* 🔝 NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h2 className="brand-title">Notes Summarizer</h2>
        </div>

        <div className="navbar-actions">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-link">
                <button className="btn-secondary">Login</button>
              </Link>

              <Link to="/signup" className="nav-link">
                <button className="btn-primary">Signup</button>
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>

      {/* 📤 MAIN CONTENT */}
      <main className="main-content">
        <div className="content-wrapper">
          <FileUpload />
        </div>
      </main>
    </div>
  );
};

export default Home;