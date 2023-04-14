import { createContext, useContext, useState } from "react";
import CryptoJS from "crypto-js";
import { enc } from "crypto-js";
import ShopClient from "../api/shopClient";
import Shop from "../api/shop";
export const LoginContext = createContext();

export function LoginApiProvider({ children }) {
  const client = new ShopClient();
  const shop = new Shop(client);
  // const [login, setLogin] = useState(() => {
  //   if (sessionStorage.login) {
  //     console.log("login", sessionStorage.login);
  //     return JSON.parse(
  //       CryptoJS.AES.decrypt(
  //         sessionStorage.login,
  //         process.env.REACT_APP_SECRET_KEY
  //       ).toString()
  //     );
  //   }
  // });
  // const setValidateUser = (user) => {
  //   console.log("user", user);
  //   if (user) {
  //     console.log("ㅇㅇ");
  //     let bytes = CryptoJS.AES.encrypt(
  //       JSON.stringify(user),
  //       process.env.REACT_APP_SECRET_KEY
  //     ).toString();
  //     sessionStorage.login = bytes;
  //     //setLogin(user);
  //   } else {
  //     setLogin("");
  //     sessionStorage.removeItem("login");
  //   }
  // };
  return (
    <LoginContext.Provider value={{ shop }}>{children}</LoginContext.Provider>
  );
}

export function useLoginApi() {
  return useContext(LoginContext);
}
