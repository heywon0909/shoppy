import { useQuery } from "@tanstack/react-query";
import { useShopApi } from "context/ShopContext";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoBuyLink({ id, classFmt }) {
  const navigate = useNavigate();
  const { shop } = useShopApi();
  //   const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  //   const { refetch: addBuyingItem } = useQuery(
  //     ["addBuying"],
  //     () => shop.updateBuying(stored,)
  //   );
  return (
    <button
      className={classFmt}
      onClick={() => navigate("/myPage/order/new/" + id)}
    >
      바로구매
    </button>
  );
}
