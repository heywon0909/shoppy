import { Navigate } from "react-router-dom";
import React from "react";
import { useAuthApi } from "context/AuthContext";

export default function ProtectedLayout({ children, requiredAdmin }) {
  const { user,isUserLoading } = useAuthApi();
  
  
  while (isUserLoading) {
    return <div className='w-full h-screen flex justify-center items-center'>
          <img
            src="/assets/image/CVyf.gif"
            title="loading"
            alt="loadingBar"
            className="w-60 h-36"
          />
        </div>
  }
  if ((!user || (requiredAdmin && !user.isAdmin)) && isUserLoading===false) {
    return <Navigate to="/" replace />;
  }
  if (user && isUserLoading === false) {
  return children;
  }
  
}
