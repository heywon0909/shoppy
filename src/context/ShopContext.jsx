import { createContext, useContext } from "react";
import ShopClient from "../api/shopClient";
import Shop from "../api/shop";

export const ShopContext = createContext();

export function ShopApiProvider({ children }) {
  const client = new ShopClient();
  const shop = new Shop(client);

  return (
    <ShopContext.Provider value={{ shop }}>{children}</ShopContext.Provider>
  );
}

export function useShopApi() {
  return useContext(ShopContext);
}
