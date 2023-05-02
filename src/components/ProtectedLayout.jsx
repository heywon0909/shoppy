import { Navigate } from "react-router-dom";
import React from "react";
import { useAuthApi } from "context/AuthContext";

export default function ProtectedLayout({ children, requiredAdmin }) {
  const { user } = useAuthApi();
  console.log("user", user);
  if (!user || (requiredAdmin && !user.isAdmin)) {
    console.log("user", user);
    return <Navigate to="/" replace />;
  }

  return children;
}
