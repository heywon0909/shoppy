import React from "react";
// import CryptoJS from "crypto-js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLoginApi } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLoginApply, getLoginDismiss } from "../api/ShopServices";
export default function LoginStateBar() {
  const { login, setValidateUser } = useLoginApi();
  const navigate = useNavigate();

  const { refetch: loginApply, data: user } = useQuery(
    ["login"],
    getLoginApply,
    {
      enabled: false,
      onSuccess: (data) => {
        console.log('data',data)
        setValidateUser(data);
      },
    }
  );

  const { refetch: logoutApply } = useQuery(["logout"], getLoginDismiss, {
    enabled: false,
    onSuccess: () => {
      setValidateUser("");
      navigate("./");
    },
  });

  const handleLogin = () => {
    if (login) logoutApply();
    else {
      loginApply();
    }
  };

  const checkValidateUser = () => {
    if (login) navigate("./myPage");
    else getLoginApply();
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
