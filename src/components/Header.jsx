import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
export default function Header() {
  return (
    <header className="w-full flex p-2 items-stretch border-b border-zinc-800">
      <div className="max-w-screen-xl text-2xl grow flex items-center font-sans font-bold text-red-600">SHOPPY</div>
      <div className="flex grow flex-row-reverse p-2 mr-5">
        <button className='ml-2'>
          <FaUserCircle size="25" />
        </button>
        <button>
          <BsCartCheck size="25" />
        </button>
        </div>
    </header>
  );
}
