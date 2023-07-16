import React from "react";
import HomePage from "./pages/HomePage";
import FileUploadPage from "./pages/FileUploadPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<FileUploadPage />} />
      {/* any another Route */}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default App;
