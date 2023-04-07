import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useLoginApi } from "../context/LoginContext";
import { getItem, getMyInterest, onAddInterest,onRemoveInterest } from "../api/ShopServices";
export default function ItemDetail() {
  const { id } = useParams();
  const { login } = useLoginApi();
  const { isLoading: isInterest, data:interest } = useQuery(
    ["exist"],
    () => getMyInterest(id,login.uid),
    {
      keepPreviousData: false,
      select: data => {
        console.log('data', data);
        const interest = data.filter((item) => item.id === id);
        return interest;
      }
    }
  );
 
  const { isLoading, data } = useQuery(["itemDetail"], () => getItem(id));
  const { refetch: addInterest } = useQuery(["addInterest"], () => onAddInterest(data,login), {
      enabled: false
  });
  const { refetch: removeItem } = useQuery(["removeInterest"], () => onRemoveInterest(data, login), {
   enabled:false
  })
  const handleInterest = () => {
    console.log('interest', interest);
    if (interest?.length === 0) {
     if (login) {
      return addInterest();
    } else {
      return console.alert('로그인을 해주세요');
    } 
    }
    if (login) {
      console.log('응')
      removeItem();
    }
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
            <div className="p-2 space-y-4 border-b border-zinc-300">
              {!isInterest && interest?.length > 0 ? (
                <BsHeartFill onClick={handleInterest} />
              ) : (
                <BsHeart onClick={handleInterest} />
              )}
            </div>
            <div className="space-y-4 border-b border-zinc-300 pb-4 h-full">
              <p>{data.snippet.description}</p>
              {/* <p className="text-purple-500 text-2xl">하트작업중..</p> */}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
