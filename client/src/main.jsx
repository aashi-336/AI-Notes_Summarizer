import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { FileProvider } from "./context/FileContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <FileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FileProvider>
    </AuthProvider>
  </StrictMode>
);
