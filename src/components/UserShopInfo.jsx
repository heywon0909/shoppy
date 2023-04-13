import React from "react";
export default function UserShopInfo() {
  return (
    <div className="p-2 flex w-full flex-wrap h-24">
      <div className="w-24 h-24 bg-gradient-to-r from-slate-300 to-zinc-600 rounded-full">
        <div className="relative w-full h-24 flex justify-center items-center text-white font-base">
          혜원님
        </div>
      </div>
      <div className="flex flex-col p-2 h-24">
        <p>박혜원 님</p>
        <div className="flex text-sm text-zinc-600 flex-wrap">
          누적 구매 금액
          <p className="font-semibold">77,000 원</p>
        </div>
      </div>
    </div>
  );
}
