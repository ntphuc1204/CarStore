import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role"); // bạn phải lưu role sau login

  if (!token || role !== "Admin") {
    return <Navigate to="/admin/" replace />;
  }

  return children;
};

export default RequireAdmin;
