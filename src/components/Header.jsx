import React from "react";
import { SlHandbag } from "react-icons/sl";
import { BsHeart } from "react-icons/bs";
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
    <header className="w-full border-b border-slate-300 mb-2 p-2 flex justify-center items-center">
      <div className="xl:w-2/3 w-full flex p-2 items-stretch">
        <div
          className="text-2xl grow flex items-center font-sans font-semibold tracking-tighter text-slate-900"
          onClick={goHome}
        >
          SHOPPY
        </div>
        <div className="flex grow flex-row-reverse p-2 mr-5">
          <button className="ml-2">
           <SlHandbag size="20" className="text-slate-900" />
          </button>
          <button>
            <BsHeart
              size="20"
              className="text-slate-900"
              onClick={getLoginApply}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
