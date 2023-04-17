import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBuyItem } from "api/ShopServices";
import { useLoginApi } from "context/LoginContext";
export default function UserShopInfo() {
  const { login } = useLoginApi();
  const { isLoading, data } = useQuery(["buyItems"], () =>
    getBuyItem(login?.uid)
  );
  console.log("items", login);

  return (
    <>
      <div className="p-2 flex w-full flex-wrap h-24 block h-auto">
        <div className="w-24 h-24 bg-gradient-to-r from-slate-300 to-zinc-600 rounded-full">
          <div className="relative w-full h-24 flex justify-center items-center text-white font-base">
            혜원님
          </div>
        </div>
        <div className="flex flex-col p-2 h-24">
          <p>혜원 님</p>
          <div className="flex text-sm text-zinc-600 flex-wrap">
            누적 구매 금액
            <p className="font-semibold">77,000 원</p>
          </div>
        </div>
        <div className="w-1/2 p-2 flex">
          <div className="w-full">
            <div className="font-semibold text-base">상품리뷰</div>
            <p>5</p>
          </div>
          <div className="w-full">
            <div className="font-semibold text-base">쿠폰</div>
            <p>5</p>
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex flex-col">
        {!isLoading && (
          <div className="text-sm w-full border-b border-zinc-300">
            {data?.date}
          </div>
        )}
        {!isLoading &&
          data.items?.length > 0 &&
          data?.items.map((item) => {
            return (
              <div
                className="border-b border-zinc-300 relative flex"
                key={item.id}
              >
                <div className="flex">
                  <div className="flex p-2">
                    <div className=" h-32 w-24 bg-slate-300">
                      <img
                        src={`../${item?.snippet.url}`}
                        alt={item.title}
                        className="w-full h-32"
                      />
                    </div>
                    <div className="flex flex-col p-2 h-24">
                      <p className="text-sm">{item.title}</p>
                      <div className="flex text-sm text-zinc-600 flex-wrap">
                        1개
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
