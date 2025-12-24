// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import SummaryPanel from "../components/SummaryPanel";
// import { useFile } from "../context/FileContext";

// const SummaryPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const fileInfo = location.state?.fileInfo;

//   // 🔴 HARD GUARD
//   useEffect(() => {
//     console.log("SUMMARY PAGE FILEINFO:", fileInfo);

//     if (!fileInfo?.rawUrl || !fileInfo?.fileType) {
//       console.error("Invalid fileInfo, redirecting...");
//       navigate("/", { replace: true });
//     }
//   }, [fileInfo, navigate]);

//   if (!fileInfo?.rawUrl || !fileInfo?.fileType) return null;

//   return (
//     <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
//       <h2>Summary</h2>
//       <SummaryPanel fileInfo={fileInfo} />
//     </div>
//   );
// };

// export default SummaryPage;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SummaryPanel from "../components/SummaryPanel";
import { useFile } from "../context/FileContext";

const SummaryPage = () => {
  const navigate = useNavigate();
  const { fileInfo } = useFile();

  useEffect(() => {
    console.log("SUMMARY PAGE FILEINFO:", fileInfo);

    if (!fileInfo?.rawUrl || !fileInfo?.fileType) {
      console.error("Invalid fileInfo, redirecting...");
      navigate("/", { replace: true });
    }
  }, [fileInfo, navigate]);

  if (!fileInfo) return null;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>Summary</h2>
      <SummaryPanel fileInfo={fileInfo} />
    </div>
  );
};

export default SummaryPage;
