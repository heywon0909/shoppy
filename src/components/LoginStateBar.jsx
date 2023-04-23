import React, { useEffect, useMemo } from "react";
// import CryptoJS from "crypto-js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useShopApi } from "context/ShopContext";
import {useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import UserStateBut from "./UserStateBut";
export default function LoginStateBar() {
  const { shop } = useShopApi();


  const navigate = useNavigate();

  const { refetch: loginApply } = useQuery(
    ["loginRedirect"],
    () => shop.loginToGoogle(),
    {
      enabled: false,
    }
  );

  // let isTrue = Object.keys(sessionStorage).find((key) =>
  //   key.includes("pendingRedirect")
  // );
  const { isSuccess: isLoginSuccess, refetch:loginToGoogle } = useQuery(
    ["login"],
    () => shop.login(),
    {
      enabled: false,
      select: (data) => {
        let userObj = { uid: data.uid, username: data.displayName };
        shop.auth(userObj);
      },
    }
  );

  const { isSuccess: isLogoutSuccess, refetch: logoutApply } = useQuery(
    ["logout"],
    () => shop.logout(),
    {
      enabled: false,
    }
  );

  const handleLogin = () => {
    // const stored = JSON.parse(sessionStorage.shoppy);
    if (shop.authRequired()) {
      return logoutApply(),navigate('/');
    } else {
      return loginApply();
    }
  };

  const checkValidateUser = () => {
    if (shop.authRequired()) navigate("secured/mypage/myPage");
    else loginApply();
  };

  const UserStateButton = useMemo(() => {
    if (isLoginSuccess || isLogoutSuccess) {
      if (isLogoutSuccess) {
        shop.auth();
      }
      return shop.authRequired();
    } else return shop.authRequired();
  }, [shop, isLoginSuccess, isLogoutSuccess]);


    useEffect(() => {
    let isTrue = Object.keys(sessionStorage).find((key) =>
      key.includes("pendingRedirect")
    );
      if (isTrue) {
        loginToGoogle();
      }
      return;
  
  },[loginToGoogle]);


  return (
    <div className="w-full flex flex-row-reverse p-2 mr-2 bg-black">
      <button
        className="mr-4 text-xs text-slate-300"
        onClick={checkValidateUser}
      >
        마이페이지
      </button>
      <button className="mr-2 text-xs text-slate-300" onClick={handleLogin}>
        {UserStateButton != null ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}
