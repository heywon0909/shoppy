import React, { useCallback, useMemo } from "react";

export default function UserInfo({ user, items }) {
  const { username } = user;
  const setUserShop = useCallback((items) => {
    let count = { total: 0, totalSum: 0 };
    if (!items) return count;
    Object.values(items).forEach((item) => {
      const { price, snippet } = item;
      count.totalSum +=
        (1 - snippet.discount / 100) * price * Number(item.count);
      count.total += Number(item.count);
    });
    return count;
  }, []);

  const sum = useMemo(() => setUserShop(items), [items, setUserShop]);

  return (
    <>
      <div className="w-24 h-24 bg-gradient-to-r from-slate-300 to-zinc-600 rounded-full mr-5">
        <div className="relative w-full h-24 flex justify-center items-center text-white font-base">
          {username}님
        </div>
      </div>
      <div className="flex flex-col p-2 h-24">
        <p> {username} 님</p>
        <div className="flex text-sm text-zinc-600 flex-wrap">
          누적 구매 금액
          <p className="font-semibold ps-2">
            {new Intl.NumberFormat("ko-KR").format(sum?.totalSum)} 원
          </p>
        </div>
      </div>
      <div className="w-1/2 p-2 flex justify-center">
        <div className="w-full flex flex-col lg:items-end">
          <div className="font-semibold text-base">구매상품</div>
          <p className="text-sm p-1">{sum?.total} 개</p>
        </div>
      </div>
    </>
  );
}
