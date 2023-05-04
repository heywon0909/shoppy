import React, { useCallback, useMemo } from "react";
import GoBuyLink from "./GoBuyLink";
export default function TotalCount({ items }) {
  const setShopTotal = useCallback((items) => {
    let count = { total: 0, discountSum: 0, buyItems: [] };
    if (!items) return;
    Object.values(items).forEach((item) => {
      const { price, discount } = item;

      count.total += parseInt(price) * Number(item.count);
      count.discountSum +=
        ((discount == null ? 100 : discount) / 100) *
        price *
        Number(item.count);
      count.buyItems.push(item.id);
    });
    return count;
  }, []);

  const sum = useMemo(() => setShopTotal(items), [items, setShopTotal]);
  const { total, discountSum } = sum;
  const SHIPPING = 3000;
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
          <div className="flex justify-center">{SHIPPING}원</div>
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
          <div className="flex justify-center">
            {total - discountSum + SHIPPING}원
          </div>
          <div className="text-xs text-zinc-600 flex justify-center">
            상품금액
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex justify-center">
        <GoBuyLink
          item={items}
          classFmt={"md:w-2/3 w-full bg-slate-900 text-white p-4 text-sm"}
        />
      </div>
    </div>
  );
}
