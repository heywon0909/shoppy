import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useShopApi } from "context/ShopContext";
import { toast } from "react-toastify";
import GoBuyLink from "./GoBuyLink";
export default function ItemDetail({ id, item }) {
  const { shop } = useShopApi();
  const stored = JSON.parse(sessionStorage.getItem("shoppy"));
  console.log("item", item);
  const { title, image, price, description } = item;
  const {
    isLoading: isInterest,
    data: interest,
    refetch: readingItem,
  } = useQuery(["exist"], () => shop.getInterest(stored, id), {
    enabled: !!stored,
  });

  const { isSuccess: isAddingSuccess, refetch: onAddInterest } = useQuery(
    ["onAddInterest"],
    () => shop.addInterest(stored, item),
    { enabled: false }
  );

  const { isSuccess: isDeleteSuccess, refetch: onDelInterest } = useQuery(
    ["onDeleteInterest"],
    () => shop.delInterest(stored, item),
    {
      enabled: false,
    }
  );
  if (isDeleteSuccess || isAddingSuccess) {
    readingItem(id, stored?.uid);
  }

  const { refetch: onAddBuying } = useQuery(
    ["onAddBuying"],
    () => shop.addBuying(stored, item),
    {
      onSuccess: () => {
        console.log("타니");
        toast.success("장바구니에 추가되었습니다.", { autoClose: 2000 });
      },
      enabled: false,
    }
  );

  return (
    <section className="flex justify-center p-2">
      {item && (
        <article className="w-full max-w-screen-xl flex p-2 justify-center flex-wrap">
          <div className="xl:w-3/6 w-full h-auto">
            <img src={image} className="h-max w-full" alt={title} />
          </div>
          <div className="flex flex-col p-2 h-auto xl:w-3/6 w-full">
            <div className="space-y-4 border-b border-zinc-300 pb-4">
              <p className="text-2xl">{title}</p>
              <p className="text-purple-500 text-2xl">
                {new Intl.NumberFormat("ko-KR").format(price)}
              </p>
            </div>
            <div className="p-2 border-b border-zinc-300 flex">
              <div className="pt-1">
                {!isInterest && interest?.length > 0 ? (
                  <BsHeartFill
                    onClick={() => {
                      if (!stored) return toast.error("로그인 후 이용해주세요");
                      onDelInterest(stored, item);
                    }}
                  />
                ) : (
                  <BsHeart
                    onClick={() => {
                      if (!stored) return toast.error("로그인 후 이용해주세요");
                      return onAddInterest(item);
                    }}
                  />
                )}
              </div>
              {/* <p className='ml-2 pb-1 text-sm font-semibold text-zinc-500'>{data.heart}+</p> */}
            </div>
            <div className="space-y-4 border-b border-zinc-300 pb-4 h-full">
              <p>{description}</p>
              {/* <p className="text-purple-500 text-2xl">하트작업중..</p> */}
              <div className="w-full flex items-stretch p-2">
                <button
                  className="w-full bg-slate-700 text-white p-2 mr-2"
                  onClick={() => {
                    if (!stored) return toast.error("로그인 후 이용해주세요");
                    onAddBuying(item);
                  }}
                >
                  장바구니
                </button>

                <GoBuyLink
                  item={item}
                  classFmt={"w-full bg-purple-500 text-white p-2"}
                />
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
