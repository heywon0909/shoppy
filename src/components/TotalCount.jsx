import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TotalCount({ sum }) {
  const { total, discountSum, items } = sum;
  const [buyTotal, setBuyTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    return setBuyTotal(sum.total - sum.discountSum + 2500);
  }, [sum]);
  return (
    <div className="w-full flex flex-col mt-10 border-t border-zinc-600 space-y-3">
      <div className="w-full flex border-b border-zinc-300 text-sm p-2">
        <div className="flex">결제 예정금액</div>
        <div className="ml-2 flex">
          총<mark>1</mark>건
        </div>
      </div>
      <div className="p-2 flex md:flex-nowrap flex-wrap">
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-center">{total}원</div>
          <div className="text-xs text-zinc-600 flex justify-center">
            상품금액
          </div>
        </div>
        <div className="w-5">+</div>
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-center">2500원</div>
          <div className="text-xs text-zinc-600 flex justify-center">
            배송비
          </div>
        </div>
        <div className="w-5">-</div>
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-center">{discountSum}원</div>
          <div className="text-xs text-zinc-600 flex justify-center">
            할인금액
          </div>
        </div>
        <div className="w-5">=</div>
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-center">{buyTotal}원</div>
          <div className="text-xs text-zinc-600 flex justify-center">
            상품금액
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex justify-center">
        <button
          className="md:w-2/3 w-full bg-slate-900 text-white p-4 text-sm"
          onClick={() =>
            navigate("/myPage/order/new/" + String(items?.join("&")))
          }
        >
          바로구매
        </button>
      </div>
    </div>
  );
}
