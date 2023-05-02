import React, { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GoBuyLink from "./GoBuyLink";
import { useAuthApi } from "context/AuthContext";
import {
  addMyInterest,
  addNewCart,
  getInterest,
  removeItem,
} from "api/firebase";
export default function ItemDetail({
  id,
  item,
  item: { title, image, price, description, options },
}) {
  const [selected, setSelected] = useState(options && options[0]);
  const changeSelect = (e) => setSelected(e.target.value);
  const { user } = useAuthApi();

  const {
    isLoading: isInterest,
    data: interest,
    refetch: readingItem,
  } = useQuery(["exist"], () => getInterest(id, user?.uid), {
    enabled: !!user,
  });

  const handleCart = () => {
    if (!user)
      return toast.error("로그인 후 이용해주세요.", { autoClose: 2000 });
    addNewCart(item, user?.uid).then((result) => {
      toast.success("장바구니에 추가되었습니다.", { autoClose: 2000 });
    });
  };
  const handleInterest = (type) => {
    if (type === "filled") {
      removeItem("interest", id, user?.uid).then((result) =>
        readingItem(id, user?.uid)
      );
    } else {
      addMyInterest(item, user?.uid).then((result) =>
        readingItem(id, user?.uid)
      );
    }
  };

  return (
    <section className="flex justify-center pr-2">
      {item && (
        <article className="w-full max-w-screen-xl p-2 flex justify-center flex-wrap basis-11/12">
          <div className="xl:w-3/6 w-full h-auto">
            <img src={image} className="h-max w-full" alt={title} />
          </div>
          <div className="flex flex-col p-2 h-auto xl:w-3/6 w-full">
            <div className="space-y-4 border-b border-zinc-300 pb-4">
              <p className="text-2xl">{title}</p>
              <p className="text-purple-500 text-2xl">
                {new Intl.NumberFormat("ko-KR").format(price)}
              </p>
              <div className="flex">
                <label htmlFor="select">옵션 :</label>
                <select id="select" onChange={changeSelect} value={selected}>
                  {options &&
                    options.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="p-2 border-b border-zinc-300 flex">
              <div className="pt-1">
                {!isInterest && interest?.length > 0 ? (
                  <BsHeartFill onClick={() => handleInterest("filled")} />
                ) : (
                  <BsHeart onClick={() => handleInterest("fill")} />
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
                  onClick={handleCart}
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
