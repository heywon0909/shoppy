import React from "react";
import { useNavigate } from "react-router-dom";

export default function Item({ item, index }) {
  const { title, price, snippet } = item;
  const navigate = useNavigate();
  const goDetail = () => navigate(`/item/${title}`);
  return (
    <div className="lg:w-1/5 md:w-1/4 w-max flex flex-col" key={index}>
      <article className="p-2">
        <img
          src={snippet.url}
          className="h-max w-full"
          alt={title}
          onClick={goDetail}
        />
        <div className="flex flex-col p-2">
          <p className="text-zinc-600 text-sm">{title}</p>
          <p className="text-md font-semibold">{price}</p>
        </div>
      </article>
    </div>
  );
}
