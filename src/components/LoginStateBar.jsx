import React, { useEffect } from "react";
// import CryptoJS from "crypto-js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLoginApi } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuth, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import {
  getLoginApply,
  getLoginDismiss,
  signWithGoogle,
} from "../api/ShopServices";
export default function LoginStateBar() {
  const { shop, login, setValidateUser } = useLoginApi();
  console.log("shop", shop);
  const navigate = useNavigate();

  const { refetch: loginApply, data: isLoginApplying } = useQuery(
    ["login"],
    signWithGoogle,
    {
      enabled: false,
    }
  );
  console.log("is", isLoginApplying, isLoginApplying == null);

  // const { data: user } = useQuery(["login"], getLoginApply, {
  //   enabled: true,
  //   select: (data) => {
  //     if (data) {
  //       let userObj = { uid: data.uid, username: data.username };
  //       sessionStorage.setItem("shoppy", JSON.stringify(userObj));
  //       shop.login(data);
  //     }
  //   },
  // });

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
    if (login) navigate("secured/mypage/myPage");
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
        {sessionStorage.login ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}
