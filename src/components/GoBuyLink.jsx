import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GoBuyLink({ item, classFmt }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("lo", pathname);
  const idFmt = Array.isArray(item)
    ? item.map((data) => data.id)?.join("&")
    : item.id;
  const saveItemToBuy = useCallback((data) => {
    const itemArr = Array.isArray(data)
      ? data.map((item) => ({
          ...item,
          count: item.count == null ? 1 : item.count,
        }))
      : [{ ...data, count: data.count == null ? 1 : data.count }];

    sessionStorage.setItem("item", JSON.stringify(itemArr));
  }, []);
  return (
    <button
      className={classFmt}
      onClick={() => {
        saveItemToBuy(item);
        if (pathname.includes("cart")) {
          return navigate("/myPage/order/new/buying/" + idFmt);
        }
        navigate("/myPage/order/new/" + idFmt);
      }}
    >
      바로구매
    </button>
  );
}
