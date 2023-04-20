import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useShopApi } from "context/ShopContext";
import TotalCount from "./TotalCount";
import ShopItem from "./ShopItem";

export default function MyCart() {
  const { shop } = useShopApi();

  const { data: items, refetch: getBuyingItems } = useQuery(
    ["getBuying"],
    () => {
      const stored = JSON.parse(sessionStorage.getItem("shoppy"));
      return shop.getBuying(stored);
    }
  );

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
            {items &&
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
        {items?.length >= 0 ? (
          <div className="w-full flex justify-center text-sm h-40 items-center">
            <div className="text-purple-700">장바구니에 상품을 담아주세요</div>
          </div>
        ) : (
          ""
        )}
        {items?.length > 0 ? (
          <TotalCount items={items} key="totalCount" />
        ) : null}
      </div>
    </div>
  );
}
