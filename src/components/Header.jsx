import React from "react";
import { SlHandbag } from "react-icons/sl";
import { BsHeart } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import User from "./User";
import { useAuthApi } from "context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  const { user } = useAuthApi();
  const goMyPage = (type) => {
    if (!user)
      return toast.error("로그인 후 이용해주세요", { autoClose: 2000 });
    if (type === "buying") {
      return navigate("/myPage/order/cart");
    } else if (type === "interest") {
      return navigate("/myPage/myWishList");
    } else if (type === "products") {
      return navigate("/products/new");
    } else throw new Error("not found page");
  };
  return (
    <header className="w-full border-b border-slate-300 mb-2 p-2 flex justify-center items-center">
      <div className="xl:w-2/3 w-full flex p-2 items-stretch">
        <div
          className="text-2xl grow flex items-center font-sans tracking-tighter text-purple-500"
          onClick={goHome}
        >
          <mark className="font-semibold text-purple-600 pe-2">HW</mark> SHOPPY
        </div>
        <div className="flex grow flex-row-reverse p-2 md:mr-5 -mr-3">
          <div className="flex items-center pl-2 shrink-0">
            {user ? <User user={user} /> : ""}
          </div>
          {user && user.isAdmin && (
            <button className="ml-2">
              <FiEdit
                size="20"
                className="text-slate-900"
                onClick={() => goMyPage("products")}
              />
            </button>
          )}
          <button className="ml-2">
            <SlHandbag
              size="20"
              className="text-slate-900"
              onClick={() => goMyPage("buying")}
            />
          </button>
          <button>
            <BsHeart
              size="20"
              className="text-slate-900"
              onClick={() => goMyPage("interest")}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
