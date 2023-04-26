import React, { useMemo, useEffect } from "react";
import Header from "./Header";
import LoginStateBar from "./LoginStateBar";
// import { useShopApi } from "context/ShopContext";

export default function Headers() {
  //   const { user } = useShopApi();
  //   console.log("shop", shop.authRequired());
  //   const isAuth = shop.authRequired();
  //   useEffect(() => {
  //     console.log("session", JSON.parse(sessionStorage.getItem("shoppy")));
  //   });
  //   const user = useMemo(() => {
  //     if (isAuth) {
  //       return isAuth;
  //     }
  //     if (!isAuth) return null;
  //   }, [isAuth]);
  //   console.log("user", user);
  return (
    <>
      <LoginStateBar />
      <Header />
    </>
  );
}
