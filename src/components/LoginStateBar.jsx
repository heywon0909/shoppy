import React from "react";

import { useNavigate } from "react-router-dom";
import { logout, signWithGoogle } from "api/firebase";
import { useAuthApi } from "context/AuthContext";
export default function LoginStateBar() {
  const navigate = useNavigate();
  const { user } = useAuthApi();
  const handleLogin = () => {
    console.log("타니");
    if (user) {
      logout();
      navigate("/");
    } else {
      signWithGoogle();
    }
  };

  const checkValidateUser = () => {
    if (user) navigate("secured/mypage/myPage");
    else signWithGoogle();
  };

  return (
    <div className="w-full flex flex-row-reverse p-2 mr-2 bg-black">
      <button
        className="mr-4 text-xs text-slate-300"
        onClick={checkValidateUser}
      >
        마이페이지
      </button>
      <button className="mr-2 text-xs text-slate-300" onClick={handleLogin}>
        {user ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}
