import React, { useState } from "react";
import { toast } from "react-toastify";
import AddBut from "./AddBut";
import { useLocation, useNavigate } from "react-router-dom";
import { addBuy } from "api/firebase";
import { useAuthApi } from "context/AuthContext";
export default function MyShopping({ route }) {
  const { user } = useAuthApi();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("lo", pathname);

  const [items, setItems] = useState(
    () => JSON.parse(sessionStorage.getItem("item")) || []
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
  const handleBuy = () => {
    addBuy(items, user.uid)
      .then((result) => {
        toast.success("결제가 완료되었습니다.", { autoClose: 2000 });
        sessionStorage.removeItem("item");
        navigate("/secured/mypage/myPage");
      })
      .catch((error) =>
        toast.error("결제하는데 에러가 발생하였습니다.", { autoClose: 2000 })
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
                          src={item.image}
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
            onClick={handleBuy}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
