import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useShopApi } from "context/ShopContext";
import { toast } from "react-toastify";
import AddBut from "./AddBut";
import { useNavigate } from "react-router-dom";
export default function MyShopping({ route }) {
  const { shop } = useShopApi();
  const navigate = useNavigate();
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));

  const [items, setItems] = useState(
    () => JSON.parse(sessionStorage.getItem("item")) || []
  );

  const { refetch: onBuyItem } = useQuery(
    ["getBuy"],
    () => {
      const itemsArr = items.map((item) => ({ ...item, date: new Date() }));
      return shop.buyItem(stored, itemsArr);
    },
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          toast.success("결제가 완료되었습니다.", { autoClose: 2000 });
          sessionStorage.removeItem("item");
          navigate("/secured/mypage/myPage");
        }
      },
    }
  );
  const handleAdd = (item) => {
    setItems((prev) =>
      prev.map((data) => {
        if (data.id === item.id) {
          return { ...data, count: Number(data.count) + 1 };
        } else return { ...data };
      })
    );
  };

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
            {items?.map((item) => {
              return (
                <tr className="border-b border-zinc-300 relative" key={item.id}>
                  <td>
                    <div className="flex p-2">
                      <div className=" h-32 w-24 bg-slate-300">
                        <img
                          src={item?.snippet.url}
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
                    <div className="text-sm p-2 h-24 text-center flex">
                      {item.count == null ? 1 : item.count}개
                      <AddBut item={item} handleAdd={handleAdd} />
                    </div>
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
            onClick={() => onBuyItem()}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
