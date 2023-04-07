import React from "react";

export default function MyShopping() {
  return (
    <div className="p-2 grow-0 flex flex-wrap">
      <div className="md:w-1/2 p-2 flex w-full flex-wrap">
        <div className="w-24 h-24 bg-slate-300 rounded-full"></div>
        <div className="flex flex-col p-2">
          <p>박혜원 님</p>
          <div className="flex text-sm text-zinc-600 flex-wrap">
            누적 구매 금액
            <p className="font-semibold">77,000 원</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 p-2 flex">
        <div>
          <div className="font-semibold text-base">상품리뷰</div>
          <p>5</p>
        </div>
        <div>
          <div className="font-semibold text-base">쿠폰</div>
          <p>5</p>
        </div>
      </div>
    </div>
  );
}
