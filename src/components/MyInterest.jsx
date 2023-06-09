import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getInterest } from "api/firebase";
import { useAuthApi } from "context/AuthContext";
export default function MyInterest() {
  const { user } = useAuthApi();
  const navigate = useNavigate();
  const goDetail = (id) => navigate(`/item/${id}`);
  const { isLoading, data: items } = useQuery(["myInterest"], () =>
    getInterest(null, user?.uid)
  );
  const hasInterest = items && items.length > 0;

  return (
    <div className="w-full flex flex-wrap h-full p-2">
      {hasInterest &&
        items.map((item) => {
          return (
            <div
              className="md:basis-1/3 w-full p-2 flex flex-col"
              key={item.id}
            >
              <div className="w-full bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full cursor-pointer"
                  onClick={() => goDetail(item.id)}
                />
              </div>
              <div className="flex flex-col text-sm text-zinc-600 p-2">
                <p>{item.title}</p>
                <p className="font-semibold">{item.price}원</p>
              </div>
            </div>
          );
        })}
      {!hasInterest ? (
        <div className="w-full flex justify-center h-40 items-center text-sm text-purple-600">
          위시리스트에 상품을 등록해주세요
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
