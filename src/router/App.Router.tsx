import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};
