import React  from "react";
// import CryptoJS from "crypto-js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useShopApi } from "context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function LoginStateBar() {
  const { shop } = useShopApi();
  const navigate = useNavigate();

  const { refetch: loginApply } = useQuery(["loginRedirect"], ()=>shop.loginToGoogle(), {
    enabled: false,
  });

  let isTrue = Object.keys(sessionStorage).find((key) =>
    key.includes("pendingRedirect")
  );

  const { isSuccess:isLoginSuccess } = useQuery(["login"], ()=>shop.login(), {
    enabled: !!isTrue,
    select: (data) => {
      if (data) {
        let userObj = { uid: data.uid, username: data.displayName };
        sessionStorage.setItem("shoppy", JSON.stringify(userObj));
        shop.auth(data);
      }
    },
  });

  const { refetch: logoutApply } = useQuery(["logout"], ()=>shop.logout(), {
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
    const stored = JSON.parse(sessionStorage.shoppy);
    if (stored) navigate("secured/mypage/myPage");
    else loginApply();
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
        {isLoginSuccess || sessionStorage.getItem('shoppy') ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}
