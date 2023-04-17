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
  const { shop } = useLoginApi();
  console.log("shop", shop);
  const navigate = useNavigate();

  const { refetch: loginApply } = useQuery(["login"], signWithGoogle, {
    enabled: false,
    select: (data) => {
      console.log("1", data);
    },
  });

  let isTrue = Object.keys(sessionStorage).find((key) =>
    key.includes("pendingRedirect")
  );

  const { data: user } = useQuery(["login"], getLoginApply, {
    enabled: !!isTrue,
    select: (data) => {
      if (data) {
        let userObj = { uid: data.uid, username: data.displayName };
        sessionStorage.setItem("shoppy", JSON.stringify(userObj));
        shop.auth(data);
      }
    },
  });

  const { refetch: logoutApply } = useQuery(["logout"], getLoginDismiss, {
    enabled: false,
    onSuccess: () => {
      sessionStorage.removeItem("shoppy");
      navigate("./");
    },
  });
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  const handleLogin = () => {
    if (stored) logoutApply();
    else {
      loginApply();
    }
  };

  const checkValidateUser = () => {
    if (stored) navigate("secured/mypage/myPage");
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
        {user || sessionStorage.shoppy ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}
