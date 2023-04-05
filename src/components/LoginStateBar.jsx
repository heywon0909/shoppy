import React from "react";
import CryptoJS from "crypto-js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLoginApi } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
export default function LoginStateBar() {
  const { login, setLogin } = useLoginApi();
  const navigate = useNavigate();
  console.log("login", login);
  const provider = new GoogleAuthProvider();
  const getLoginApply = () => {
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("user", user, token);
        let bytes = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          process.env.REACT_APP_SECRET_KEY
        ).toString();
        console.log("bytes", bytes);
        sessionStorage.login = bytes;
        setLogin(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("error", errorCode, errorMessage, email, credential);
      });
  };
  const checkValidateUser = () => {
    if (login) navigate("/myPage");
    else getLoginApply();
  };
  const getLoginDismiss = () => {
    const auth = getAuth();
    auth.signOut();
    setLogin("");
    sessionStorage.removeItem("login");
    navigate("/");
  };
  return (
    <div className="w-full flex flex-row-reverse p-2 mr-2 bg-black">
      <button
        className="mr-4 text-xs text-slate-300"
        onClick={checkValidateUser}
      >
        마이페이지
      </button>
      {login ? (
        <button
          className="mr-2 text-xs text-slate-300"
          onClick={getLoginDismiss}
        >
          로그아웃
        </button>
      ) : (
        <button className="mr-2 text-xs text-slate-300" onClick={getLoginApply}>
          로그인
        </button>
      )}
    </div>
  );
}
