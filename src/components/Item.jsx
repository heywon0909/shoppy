import React from "react";
import { useNavigate } from "react-router-dom";

export default function Item({ item }) {
  const { image, title, price, id, category } = item;
  const navigate = useNavigate();
  const goDetail = () => navigate(`/item/${id}`, { state: { item } });

  return (
    <div
      className="xl:w-1/4 lg:w-2/5 md:w-1/2 w-max flex flex-col items-stretch cursor-pointer"
      key={id}
    >
      <article className="md:p-2 md:h-11/12 h-5/6">
        <img
          src={image}
          className="h-full w-full"
          alt={title}
          onClick={goDetail}
        />
        <div className="flex flex-col p-2">
          <p className="text-zinc-600 text-sm">{title}</p>
          <p className="text-md font-semibold">
            {new Intl.NumberFormat("ko-KR").format(price)} 원
          </p>
          <p className="text-zinc-600 text-sm">{category}</p>
        </div>
      </article>
    </div>
  );
}
