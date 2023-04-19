import { useShopApi } from "context/ShopContext";
import React, { useCallback } from "react";
import CloseBut from "./CloseBut";
import { toast } from "react-toastify";
import GoBuyLink from "./GoBuyLink";
import AddBut from "./AddBut";
export default function ShopItem({ item, onClose }) {
  const { count, title, snippet } = item;

  const { shop } = useShopApi();

  const handleDelete = useCallback(
    async (item) => {
      const stored = JSON.parse(sessionStorage.getItem("shoppy"));
      try {
        const result = await shop.delBuying(stored, item);

        if (result) {
          toast.success("장바구니에서 상품이 삭제되었습니다", {
            autoClose: 2000,
          });
          onClose();
        }
      } catch (error) {
        console.error(error);
        toast.error("오류가 발생하였습니다.");
      }
    },
    [onClose, shop]
  );

  const handleAdd = useCallback(
    async (item) => {
      const stored = JSON.parse(sessionStorage.getItem("shoppy"));
      try {
        const result = await shop.updateBuying(stored, item);
        if (result) {
          onClose();
        }
      } catch (error) {
        console.error(error);
        toast.error("오류가 발생하였습니다.");
      }
    },
    [onClose, shop]
  );

  return (
    <>
      <td>
        <div className="flex p-2">
          <div className=" h-32 w-24 bg-slate-300">
            <img src={snippet.url} alt={title} className="w-full h-32" />
          </div>
          <div className="flex flex-col p-2 h-24">
            <p className="text-sm">{title}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="text-sm p-2 h-24 text-center flex">
          {count}개
          <AddBut item={item} handleAdd={handleAdd} />
        </div>
      </td>
      <td>
        <CloseBut item={item} handleDelete={handleDelete} />
        <div className="text-sm p-2 h-24 text-center">
          {new Intl.NumberFormat("ko-KR").format(item.price)}원
        </div>
        <GoBuyLink
          item={item}
          classFmt={"w-full bg-slate-900 text-white p-2"}
        />
      </td>
    </>
  );
}
