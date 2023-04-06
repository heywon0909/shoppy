import { createContext, useContext, useState } from "react";
import CryptoJS from "crypto-js";
import { enc } from "crypto-js";
export const LoginContext = createContext();

export function LoginApiProvider({ children }) {
  const [login, setLogin] = useState(() => {
    if (sessionStorage.login) {
      return JSON.parse(
        CryptoJS.AES.decrypt(
          sessionStorage.login,
          process.env.REACT_APP_SECRET_KEY
        ).toString(enc.Utf8)
      );
    }
  });
  const setValidateUser = (user) => {
    if (user) {
      setLogin(user);
      let bytes = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        process.env.REACT_APP_SECRET_KEY
      ).toString();
      sessionStorage.login = bytes;
    } else {
      setLogin("");
      sessionStorage.removeItem("login");
    }
  };
  return (
    <LoginContext.Provider value={{ login, setValidateUser }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginApi() {
  return useContext(LoginContext);
}
