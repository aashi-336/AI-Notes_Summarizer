// import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { login } from "../services/auth";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
// const { login: loginUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const data = await login(form);

//        loginUser(data.token);

//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";


const Login = () => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await login(form);
      loginUser(data.token);
      navigate("/Home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Notes Summarizer</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;// redeploy trigger
