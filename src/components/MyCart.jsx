import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getBuyingItem } from "../api/ShopServices";
import { useLoginApi } from "../context/LoginContext";
import ShopItem from "./ShopItem";
import TotalCount from "./TotalCount";
import UserShopInfo from "./UserShopInfo";

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
      <UserShopInfo />
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
