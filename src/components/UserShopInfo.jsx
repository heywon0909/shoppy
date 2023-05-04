import { useQuery } from "@tanstack/react-query";
import React from "react";
import PurchasedItem from "./PurchasedItem";
import UserInfo from "./UserInfo";
import { useAuthApi } from "context/AuthContext";
import { getBuy } from "api/firebase";
export default function UserShopInfo() {
  const { user } = useAuthApi();

  const { isLoading, data: items } = useQuery(["buyItems"], () =>
    getBuy(null, user?.uid)
  );

  return (
    <>
      <div className="p-2 flex w-full flex-wrap h-auto items-stretch">
        <UserInfo user={user} items={items} />
      </div>
      <div className="w-full p-2 flex flex-col">
        <div className="text-sm w-full border-b font-semibold p-2">
          구매내역
        </div>
        {!isLoading &&
          items &&
          items.map((timeTb) => {
            return timeTb.items.map((item, index) => {
              return <PurchasedItem item={item} key={index} />;
            });
          })}
        {!isLoading && !items && (
          <div className="w-full flex justify-center h-40 items-center text-purple-600 text-sm">
            구매하신 내역이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
