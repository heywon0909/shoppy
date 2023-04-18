import React from "react";
import { useQuery } from "@tanstack/react-query";
// import ShopItem from "./ShopItem";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useShopApi } from "context/ShopContext";
export default function MyCartItems() {
  const { shop } = useShopApi();
  // const navigate = useNavigate();
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  // const { refetch: onDelItems } = useQuery(
  //   ["onDelBuying"],
  //   () => {
  //     console.log("item", stored, item);
  //     return shop.delBuying(stored, item);
  //   },
  //   {
  //     enabled: false,
  //     onSuccess: () => onClose,
  //   }
  // );

  return (
    <table className="table-auto text-sm">
      <thead className="border-b border-zinc-600 pb-3">
        <tr>
          <th>상품정보</th>
          <th>수량</th>
          <th>주문금액</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
