import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useShopApi } from "context/ShopContext";
export default function MyInterest() {
  const { shop } = useShopApi();
  const { isLoading, data: items } = useQuery(["myInterest"], () => {
    const stored = JSON.parse(sessionStorage.getItem("shoppy"));
    return shop.getInterest(stored);
  });

  return (
    <div className="w-full flex flex-wrap h-full p-2">
      {!isLoading &&
        items.map((item) => {
          return (
            <div className="w-1/3 p-2 flex flex-col" key={item.id}>
              <div className="w-40 h-56 bg-slate-100">
                <img
                  src={item.snippet.url}
                  alt={item.title}
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col text-sm text-zinc-600 p-2">
                <p>{item.title}</p>
                <p className="font-semibold">{item.price}원</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
