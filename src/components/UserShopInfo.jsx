import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useShopApi } from "context/ShopContext";
import PurchasedItem from "./PurchasedItem";
import UserInfo from "./UserInfo";
export default function UserShopInfo() {
  const { shop } = useShopApi();
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  const { isLoading, data: user } = useQuery(["buyItems"], () =>
    shop.getPurchasedItems(stored)
  );
  console.log("user", user);
  return (
    <>
      <div className="p-2 flex w-full flex-wrap h-auto items-stretch">
        <UserInfo user={stored} items={user?.items} />
      </div>
      <div className="w-full p-2 flex flex-col">
        <div className="text-sm w-full border-b font-semibold p-2">
          구매내역
        </div>
        {!isLoading &&
          user?.items &&
          user?.items.map((item, index) => {
            return <PurchasedItem item={item} key={index} />;
          })}
        {!isLoading && !user?.items && (
          <div className="w-full flex justify-center h-40 items-center text-purple-600 text-sm">
            구매하신 내역이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
