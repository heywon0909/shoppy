import { useQuery } from "@tanstack/react-query";
import React from "react";
import TotalCount from "./TotalCount";
import ShopItem from "./ShopItem";
import { getCarts } from "api/firebase";
import { useAuthApi } from "context/AuthContext";

export default function MyCart() {
  const { user } = useAuthApi();

  const { data: items, refetch: getBuyingItems } = useQuery(["getBuying"], () =>
    getCarts(user.uid)
  );

  const hasCarts = items && items.length > 0;

  return (
    <div className="p-2 grow-0 flex flex-wrap">
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
            {hasCarts &&
              items.map((item) => {
                return (
                  <tr
                    className="border-b border-zinc-300 relative"
                    key={item.id}
                  >
                    <ShopItem item={item} onClose={getBuyingItems} />
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!hasCarts && (
          <div className="w-full flex justify-center text-sm h-40 items-center">
            <div className="text-purple-700">장바구니에 상품을 담아주세요</div>
          </div>
        )}
        {hasCarts ? (
          <TotalCount items={items} key="totalCount" />
        ) : null}
      </div>
    </div>
  );
}
