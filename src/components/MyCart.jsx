import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useShopApi } from "context/ShopContext";
import TotalCount from "./TotalCount";
import MyCartItems from "./MyCartItems";

export default function MyCart() {
  const { shop } = useShopApi();

  const { data: items } = useQuery(["getBuying"], () => {
    const stored = JSON.parse(sessionStorage.getItem("shoppy"));
    return shop.getBuying(stored);
  });

  const buyItemInfo = items
    ? [
        <MyCartItems items={items} key="myCartItems" />,
        <TotalCount items={items} key="totalCount" />,
      ]
    : null;
  return (
    <div className="p-2 grow-0 flex flex-wrap">
      <div className="w-full p-2 flex flex-col">{buyItemInfo}</div>
    </div>
  );
}
