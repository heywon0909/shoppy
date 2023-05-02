import React from "react";

export default function PurchasedItem({
  item: { image, title, count, id, price },
}) {
  console.log("imat", image);
  return (
    <>
      <div className="text-sm w-full border-b border-zinc-300 font-semibold float-right">
        {/* {new Date(date?.seconds * 1000).toLocaleDateString()} */}
      </div>

      <div className="border-b border-zinc-300 relative flex" key={id}>
        <div className="flex w-full">
          <div className="flex p-2 w-full">
            <div className=" h-36 w-32 bg-slate-300">
              <img src={image} alt={title} className="w-full h-36" />
            </div>
            <div className="flex p-3 h-24 w-11/12 md:place-content-between flex-wrap">
              <p className="text-sm w-24">{title}</p>
              <div className="flex text-sm text-zinc-600 flex-wrap">
                {count} 개
              </div>
              <div className="flex text-sm text-zinc-600 flex-wrap">
                {new Intl.NumberFormat("ko-KR").format(price * count)} 원
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
