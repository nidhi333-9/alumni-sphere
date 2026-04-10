import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in → redirect to signin
  if (!token) return <Navigate to="/signin" replace />;

  // If trying to access admin area without admin role → go to homepage
  if (requiredRole && user?.User_Type_ID !== requiredRole) {
    return <Navigate to="/homepage" replace />;
  }

  return children;
}
