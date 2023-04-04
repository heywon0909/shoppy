import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default function Header() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

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
    <header className="max-w-screen-2xl border-b border-slate-300 mb-2">
      <div className="flex p-2 items-stretch">
        <div
          className="text-2xl grow flex items-center font-sans font-semibold tracking-tighter text-slate-900"
          onClick={goHome}
        >
          SHOPPY
        </div>
        <div className="flex grow flex-row-reverse p-2 mr-5">
          <button className="ml-2">
            <FaUserCircle
              size="20"
              className="text-slate-900"
              onClick={getLoginApply}
            />
          </button>
          <button>
            <BsCartCheck size="20" className="text-slate-900" />
          </button>
        </div>
      </div>
    </header>
  );
}
