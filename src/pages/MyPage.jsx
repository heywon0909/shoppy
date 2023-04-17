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
  const MyPageTitle = () => {
    if (pathname.includes("secured")) return "마이페이지";
    if (pathname.includes("cart")) return "장바구니";
    if (pathname.includes("Wish")) return "위시리스트";
    if (pathname.includes("new")) return "결제하기";
  };
  const MyPageComponent = () => {
    if (pathname.includes("secured")) return <UserShopInfo />;
    if (pathname.includes("cart")) return <MyCart />;
    if (pathname.includes("Wish")) return <MyInterest />;
    if (pathname.includes("new")) return <MyShopping route={pathname} />;
  };
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
            <MyPageTitle />
          </div>
          <MyPageComponent />
        </div>
      </div>
    </div>
  );
}
