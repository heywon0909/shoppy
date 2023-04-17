import React from "react";
import ShopItem from "./ShopItem";
export default function MyCartItems({ items }) {
  return (
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
            return <ShopItem item={item} key={item.id} />;
          })}
      </tbody>
    </table>
  );
}
