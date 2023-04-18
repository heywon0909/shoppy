import React from "react";
import { useNavigate } from "react-router-dom";

export default function Item({ item, index }) {
  const { title, price, snippet } = item;
  const navigate = useNavigate();
  const goDetail = () => navigate(`/item/${index}`);

  return (
    <div
      className="xl:w-max lg:w-2/5 md:w-1/2 w-max flex flex-col items-stretch"
      key={index}
    >
      <article className="md:p-2">
        <img
          src={snippet.url}
          className="xl:h-96 h-max w-full"
          alt={title}
          onClick={goDetail}
        />
        <div className="flex flex-col p-2">
          <p className="text-zinc-600 text-sm">{title}</p>
          <p className="text-md font-semibold">
            {new Intl.NumberFormat("ko-KR").format(price)}
          </p>
          {/* <div className='flex flex-row'>
            <BsHeartFill className='pt-1 text-zinc-500' />
            <p className='pb-1 text-sm text-zinc-500'>{heart}+</p>
          </div> */}
        </div>
      </article>
    </div>
  );
}
