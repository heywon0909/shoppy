import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
export default function Header() {
  return (
    <header className="max-w-screen-2xl border-b border-slate-300 mb-2">
      <div className="flex p-2 items-stretch">
        <div className="text-2xl grow flex items-center font-sans font-semibold tracking-tighter text-slate-900">
          SHOPPY
        </div>
        <div className="flex grow flex-row-reverse p-2 mr-5">
          <button className="ml-2">
            <FaUserCircle size="20" className="text-slate-900" />
          </button>
          <button>
            <BsCartCheck size="20" className="text-slate-900" />
          </button>
        </div>
      </div>
    </header>
  );
}
