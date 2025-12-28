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
//  <>
//     <Link to="/saved-notes">
//       <button>Saved Notes</button>
//     </Link>

//     <button onClick={logout}>Logout</button>
//   </>
//           // <button onClick={logout}>Logout</button>
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

const Home = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ padding: "1rem" }}>
      {/* 🔝 NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "1.5rem",
        }}
      >
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/saved-notes">
              <button>Saved Notes</button>
            </Link>

            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      {/* 📤 UPLOAD SECTION */}
      <FileUpload />
    </div>
  );
};

export default Home;
