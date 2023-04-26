import { Navigate } from "react-router-dom";
import React from "react";
import { useAuthApi } from "context/AuthContext";

export default function ProtectedLayout({ children, requiredAdmin }) {
  const { user } = useAuthApi();

  if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
