import React, { useCallback } from "react";
import CloseBut from "./CloseBut";
import { toast } from "react-toastify";
import GoBuyLink from "./GoBuyLink";
import AddBut from "./AddBut";
import { addNewCart, removeItem } from "api/firebase";
import { useAuthApi } from "context/AuthContext";

export default function ShopItem({
  item,
  item: { image, count, title, price },
  onClose,
}) {
  console.log("item", item);
  const { user } = useAuthApi();

  const handleDelete = useCallback(
    async (item) => {
      return removeItem("cart", item.id, user?.uid)
        .then((result) => {
          toast.success("장바구니에서 상품이 삭제되었습니다", {
            autoClose: 2000,
          });
          onClose();
        })
        .catch((error) => {
          console.error(error);
          toast.error("오류가 발생하였습니다.");
        });
    },
    [onClose, user]
  );

  const handleAdd = useCallback(
    async (item) => {
      await addNewCart(item, user?.uid).then((result) => {
        onClose();
      });
    },
    [onClose, user]
  );

  return (
    <>
      <td>
        <div className="flex p-2">
          <div className="md:h-48 h-32 md:w-3/6 w-24 bg-slate-300">
            <img src={image} alt={title} className="w-full h-full" />
          </div>
          <div className="flex flex-col p-2 h-24 md:w-full w-20">
            <p className="text-sm line-clamp-2">{title}</p>
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
        <CloseBut item={item} handleDelete={handleDelete}  />
        <div className="flex text-sm p-2 h-20 text-center justify-center">
          {new Intl.NumberFormat("ko-KR").format(price)}원
        </div>
        <GoBuyLink
          item={item}
          classFmt={`w-full bg-slate-900 text-white p-2 sm:text-sm h-full`}
        />
      </td>
    </>
  );
}
