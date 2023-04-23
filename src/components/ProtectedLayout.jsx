import { useShopApi } from "context/ShopContext";
import { Navigate } from "react-router-dom";
import React  from "react";

export default function ProtectedLayout({ children }) {
  const { shop } = useShopApi();
  console.log("shop", shop.authRequired());
  
  if (!shop.authRequired()) {
    return <Navigate to="/" />;
  }

  return children;
}
