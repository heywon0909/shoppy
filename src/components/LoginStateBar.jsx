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
  const { login, setValidateUser } = useLoginApi();
  const navigate = useNavigate();

  const {
    isLoading: isLoginApplying,
    refetch: loginApply,
    data: user,
  } = useQuery(["login"], signWithGoogle, {
    enabled: false,
  });

  const getGoogleOAuthResponse = async () => {
    const auth = getAuth();
    getRedirectResult(auth).then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log("user", user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      setValidateUser(user);
    });
  };

  useEffect(() => {
    if (isLoginApplying) {
      getGoogleOAuthResponse();
    }
  }, [isLoginApplying]);

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
        {user || sessionStorage.login ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}
