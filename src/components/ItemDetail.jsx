import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useLoginApi } from "context/LoginContext";
import { useNavigate } from 'react-router-dom';
export default function ItemDetail({ id, data, isLoading }) {
  const { shop } = useLoginApi();
  const navigate = useNavigate();
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  const {
    isLoading: isInterest,
    data: interest,
    refetch: readingItem,
  } = useQuery(["exist"], () => shop.getInterest(stored, id), {
    enabled: !!stored,
  });

  const { isSuccess: isAddingSuccess, refetch: onAddInterest } = useQuery(
    ["AddInterest"],
    () => shop.addInterest(stored, data),
    { enabled: false }
  );

  const { isSuccess: isDeleteSuccess, refetch: onDelInterest } = useQuery(
    ["onDeleteInterest"],
    () => shop.delInterest(stored, data),
    {
      enabled: false,
    }
  );
  if (isDeleteSuccess || isAddingSuccess) {
    readingItem(id, stored?.uid);
  }

  const { isSuccess: isAddBuying, refetch: onAddBuying } = useQuery(
    ["onAddBuying"],
    () => shop.addBuying(stored, data),
    {
      enabled: false,
    }
  );
  if (isAddBuying) {
    console.log("팝업창 구성중..");
  }

  return (
    <section className="flex justify-center p-2">
      {!isLoading && data && (
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
                  <BsHeartFill onClick={() => onDelInterest(stored, data)} />
                ) : (
                  <BsHeart onClick={() => onAddInterest(stored, data)} />
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
                  onClick={() => onAddBuying(id, stored)}
                >
                  장바구니
                </button>
                <button className="w-full bg-purple-500 text-white p-2" onClick={()=>navigate('/myPage/order/new/'+id)}>
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
