import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function GoBuyLink({ item, classFmt }) {
  const navigate = useNavigate();
  const idFmt = Array.isArray(item) ? String(item?.join("&")) : item.id;
  const saveItemToBuy = useCallback((data) => {
    const itemArr = Array.isArray(data)
      ? data.map((item) => ({ ...item, count: 1 }))
      : [{ ...data, count: 1 }];

    sessionStorage.setItem("item", JSON.stringify(itemArr));
  }, []);
  return (
    <button
      className={classFmt}
      onClick={() => {
        saveItemToBuy(item);
        navigate("/myPage/order/new/" + idFmt);
      }}
    >
      바로구매
    </button>
  );
}
