import React from "react";
import { useLocation } from "react-router-dom";
import MyPageNav from "../components/MyPageNav";
import MyCart from "../components/MyCart";
import MyShopping from "../components/MyShopping";
import MyInterest from "../components/MyInterest";
import UserShopInfo from "../components/UserShopInfo";

export default function MyPage() {
  let location = useLocation();
  const { pathname } = location;
  return (
    <div className="flex justify-center p-2">
      <div className="md:w-2/3 w-full flex p-2 flex-wrap justify-center">
        <MyPageNav />
        <div className="xl:w-2/3 w-full flex flex-col justify-center text-xl p-2 space-y-4">
          <div
            className={
              pathname.includes("secured")
                ? "border-b border-b-zinc-600 w-full h-7 flex justify-center font-semibold"
                : "w-full h-7 flex justify-center font-semibold"
            }
          >
            {pathname.includes("secured") ? "마이페이지" : ""}
            {pathname.includes("cart") ? "장바구니" : ""}
            {pathname.includes("Wish") ? "관심목록" : ""}
            {pathname.includes("new") ? "결제하기" : ""}
          </div>
          {pathname.includes("secured") ? <UserShopInfo /> : ""}
          {pathname.includes("cart") ? <MyCart /> : ""}
          {pathname.includes("Wish") ? <MyInterest /> : ""}
          {pathname.includes("new") ? <MyShopping /> : ""}
        </div>
      </div>
    </div>
  );
}
