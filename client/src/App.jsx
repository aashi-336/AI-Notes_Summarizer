import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SummaryPage from "./pages/SummaryPage";
import SavedNotesPage from "./pages/SavedNotesPage";
function App() {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/saved-notes" element={<SavedNotesPage />} />
    </Routes>
  );
}

export default App;
