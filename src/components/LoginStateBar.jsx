import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default function LoginStateBar() {
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
  return (
    <div className="max-w-screen-2xl flex flex-row-reverse p-2 mr-2 bg-black">
      <button className="pl-2 text-xs text-slate-300">마이페이지</button>
      <button className="pl-2 text-xs text-slate-300" onClick={getLoginApply}>
        로그인
      </button>
    </div>
  );
}
