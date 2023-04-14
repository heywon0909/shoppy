import React, { useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useLoginApi } from "../context/LoginContext";
import {
  addBuyingItem,
  delMyInterest,
  getItem,
  getMyInterest,
  setMyInterest,
} from "../api/ShopServices";
export default function ItemDetail() {
  const { id } = useParams();
  const { shop, login } = useLoginApi();

  const {
    isLoading: isInterest,
    data: interest,
    refetch: readingItem,
  } = useQuery(["exist"], () => shop.getItem(id), {
    enabled: false,
    select: (data) => {
      const interest = data?.filter((item) => item.id === id);
      return interest;
    },
  });

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.shoppy);
    const userId = stored?.uid;
    const initItemDetail = (stored, userID) => {
      shop.login(stored);
      readingItem(id, userId);
    };

    if (userId && id) {
      initItemDetail();
    }
  }, [id, readingItem, shop]);

  const { isLoading, data } = useQuery(["itemDetail"], () => getItem(id));
  const { isSuccess: isAddingSuccess, refetch: onAddInterest } = useQuery(
    ["AddInterest"],
    () => setMyInterest(data, login),
    { enabled: false }
  );

  const { isSuccess: isDeleteSuccess, refetch: onDelInterest } = useQuery(
    ["onDeleteInterest"],
    () => delMyInterest(data, login),
    {
      enabled: false,
    }
  );
  if (isDeleteSuccess || isAddingSuccess) {
    readingItem(id, login?.uid);
  }

  const { isSuccess: isAddBuying, refetch: onAddBuying } = useQuery(
    ["onAddBuying"],
    () => addBuyingItem(data, login),
    {
      enabled: false,
    }
  );
  if (isAddBuying) {
    console.log("팝업창 구성중..");
  }

  return (
    <section className="flex justify-center p-2">
      {!isLoading && (
        <article className="w-full max-w-screen-xl flex p-2 justify-center flex-wrap">
          <div className="xl:w-3/6 w-full h-auto">
            <img
              src={data.snippet.url}
              className="h-max w-full"
              alt={data.title}
            />
          </div>
          <div className="flex flex-col p-2 h-auto xl:w-3/6">
            <div className="space-y-4 border-b border-zinc-300 pb-4">
              <p className="text-2xl">{data.title}</p>
              <p className="text-purple-500 text-2xl">{data.price}</p>
            </div>
            <div className="p-2 border-b border-zinc-300 flex">
              <div className="pt-1">
                {!isInterest && interest?.length > 0 ? (
                  <BsHeartFill onClick={() => onDelInterest(data, login)} />
                ) : (
                  <BsHeart onClick={() => onAddInterest(data, login)} />
                )}
              </div>
              {/* <p className='ml-2 pb-1 text-sm font-semibold text-zinc-500'>{data.heart}+</p> */}
            </div>
            <div className="space-y-4 border-b border-zinc-300 pb-4 h-full">
              <p>{data.snippet.description}</p>
              {/* <p className="text-purple-500 text-2xl">하트작업중..</p> */}
              <div className="w-full flex items-stretch p-2">
                <button
                  className="w-full bg-slate-700 text-white p-2 mr-2"
                  onClick={() => onAddBuying(id, login)}
                >
                  장바구니
                </button>
                <button className="w-full bg-purple-500 text-white p-2">
                  바로구매
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
