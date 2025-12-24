import { createContext, useContext, useState } from "react";

const FileContext = createContext(null);

export const FileProvider = ({ children }) => {
  const [fileInfo, setFileInfo] = useState(null);

  return (
    <FileContext.Provider value={{ fileInfo, setFileInfo }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used inside FileProvider");
  }
  return context;
};
