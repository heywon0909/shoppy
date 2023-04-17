import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useShopApi } from "context/ShopContext";
export default function ShopItem({ item }) {
  const { id, price, title, snippet } = item;
  const navigate = useNavigate();
  const { shop } = useShopApi();
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  const { refetch: onDelItems } = useQuery(
    ["onDelBuying"],
    () => shop.delBuying(stored, item),
    {
      enabled: false,
    }
  );

  return (
    <tr className="border-b border-zinc-300 relative">
      <td>
        <div className="flex p-2">
          <div className=" h-32 w-24 bg-slate-300">
            <img
              src={snippet.url}
              alt={title}
              className="w-full h-32"
            />
          </div>
          <div className="flex flex-col p-2 h-24">
            <p className="text-sm">{title}</p>
            <div className="flex text-sm text-zinc-600 flex-wrap">1개</div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-sm p-2 h-24 text-center">1개</div>
      </td>
      <td>
        <button className="absolute right-0 top-5">
          <IoMdClose
            className="text-slate-500"
            size="15"
            onClick={() => onDelItems(stored, item)}
          />
        </button>
        <div className="text-sm p-2 h-24 text-center">{price}원</div>
        <div className="relative">
          <button
            className="w-full bg-slate-900 text-white p-2"
            onClick={() => navigate("/myPage/order/new/" + id)}
          >
            바로구매
          </button>
        </div>
      </td>
    </tr>
  );
}
