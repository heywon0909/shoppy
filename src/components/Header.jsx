import React from "react";
import { BsHeart } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import User from "./User";
import { useAuthApi } from "context/AuthContext";
import CartBut from "./CartBut";

export default function Header() {
  const { user } = useAuthApi();

  return (
    <header className="w-full border-b border-slate-300 mb-2 p-2 flex justify-center items-center">
      <div className="xl:w-2/3 w-full flex p-2 items-stretch">
        <Link
          to="/"
          className="text-2xl grow flex items-center font-sans tracking-tighter text-purple-500"
        >
          <mark className="font-semibold text-purple-600 pe-2">HW</mark> SHOPPY
        </Link>
        <div className="flex grow flex-row-reverse p-2 md:mr-5 -mr-3">
          <div className="flex items-center pl-2 shrink-0">
            {user ? <User user={user} /> : ""}
          </div>
          {user && user.isAdmin && (
            <Link className="ml-2 shrink-0" to="/products/new">
              <FiEdit size="20" className="text-slate-900" />
            </Link>
          )}
          <CartBut />
          <Link to="/myPage/myWishList">
            <BsHeart size="20" className="text-slate-900" />
          </Link>
        </div>
      </div>
    </header>
  );
}
