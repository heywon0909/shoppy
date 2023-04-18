import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
export default function AddBut({ item, handleAdd }) {
  return (
    <button className="relative -m-5">
      <AiOutlinePlusSquare
        className="text-slate-500"
        size="15"
        onClick={() => handleAdd(item)}
      />
    </button>
  );
}
