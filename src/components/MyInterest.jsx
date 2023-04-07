import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMyInterest } from "../api/ShopServices";
import { useLoginApi } from "../context/LoginContext";
export default function MyInterest() {
  const { login } = useLoginApi();
  const { isLoading, data: items } = useQuery(["myInterest"], () =>
    getMyInterest(login.uid)
  );
  console.log("isLoading", isLoading, items);
  return (
    <div className="w-full flex flex-wrap h-full p-2">
      {!isLoading &&
        items.map((item) => {
          return (
            <div className="w-1/3 p-2 flex flex-col">
              <div className="w-40 h-56 bg-slate-100">
                <img
                  src={item.snippet.url}
                  alt={item.title}
                  className="h-full"
                />
              </div>
              <div className="flex flex-col text-sm text-zinc-600 p-2">
                <p>반팔 데님원피스</p>
                <p className="font-semibold">41,900원</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
