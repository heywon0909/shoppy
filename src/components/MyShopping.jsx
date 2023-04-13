import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { buyItem, getBuyingItem } from "../api/ShopServices";
import { useLoginApi } from "../context/LoginContext";
import { useLocation } from "react-router-dom";
import ShopItem from "./ShopItem";

export default function MyShopping() {
  const { pathname } = useLocation();
  const [id, setId] = useState([]);
  useEffect(() => {
    setId(pathname.replace("/myPage/order/new/", "")?.split("&"));
  }, [pathname]);

  const { login } = useLoginApi();

  const {
    isLoading,
    data: items,
    refetch: getBuyItems,
  } = useQuery(["getBuying"], () => getBuyingItem(login?.uid), {
    enabled: false,
    select: (data) => {
      return data?.filter((item) => id.includes(item.id));
    },
  });
  if (id) {
    getBuyItems(login?.uid);
  }

  const { refetch: onBuyItem } = useQuery(
    ["getBuy"],
    () => buyItem(items, login),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log("성공");
      },
    }
  );
  console.log("isLoading", isLoading, items);
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
            {!isLoading &&
              items.map((item) => {
                return (
                  <tr
                    className="border-b border-zinc-300 relative"
                    key={item.id}
                  >
                    <td>
                      <div className="flex p-2">
                        <div className=" h-32 w-24 bg-slate-300">
                          <img
                            src={`../${item?.snippet.url}`}
                            alt={item.title}
                            className="w-full h-32"
                          />
                        </div>
                        <div className="flex flex-col p-2 h-24">
                          <p className="text-sm">{item.title}</p>
                          <div className="flex text-sm text-zinc-600 flex-wrap">
                            1개
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm p-2 h-24 text-center">1개</div>
                    </td>
                    <td>
                      <div className="text-sm p-2 h-24 text-center">
                        {item.price}원
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="w-full flex justify-center p-2 mt-2">
          <button
            className="md:w-2/3 w-full bg-slate-900 text-white p-4 text-sm"
            onClick={() => onBuyItem(items, login)}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
