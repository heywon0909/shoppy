import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { getBuyingItem } from "../api/ShopServices";
import { useLoginApi } from "../context/LoginContext";
import ShopItem from "./ShopItem";
import TotalCount from "./TotalCount";

export default function MyShopInterest() {
  const { login } = useLoginApi();

  const {
    isLoading,
    data: items,
    isSuccess,
  } = useQuery(["getBuying"], () => getBuyingItem(login?.uid));
  const [sum, setSum] = useState(() => initialTotal);

  useEffect(() => {
    let count = { total: 0, discountSum: 0, items: [] };
    if (isSuccess) {
      Object.values(items).forEach((item) => {
        const { price, snippet } = item;
        count.total += price;
        count.discountSum += (snippet.discount / 100) * price;
        count.items.push(item.id);
      });
      return setSum(count);
    }
  }, [items, isSuccess]);

  return (
    <div className="p-2 grow-0 flex flex-wrap">
      <div className="p-2 flex w-full flex-wrap h-24">
        <div className="w-24 h-24 bg-slate-300 rounded-full"></div>
        <div className="flex flex-col p-2 h-24">
          <p>박혜원 님</p>
          <div className="flex text-sm text-zinc-600 flex-wrap">
            누적 구매 금액
            <p className="font-semibold">77,000 원</p>
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex flex-col">
        <table className="table-auto text-sm">
          <thead className="border-b border-zinc-600 pb-3">
            <tr>
              <th>상품정보</th>
              <th>수량</th>
              <th>주문금액</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              items.map((item) => {
                return <ShopItem item={item} key={item.id} />;
              })}
          </tbody>
        </table>
        {isSuccess && sum?.total > 0 && <TotalCount sum={sum} />}
      </div>
    </div>
  );
}
const initialTotal = { total: 0, discountSum: 0, items: [] };
