import React from "react";
import { IoMdClose } from "react-icons/io";
export default function CloseBut({ item, handleDelete }) {
  return (
    <button className="absolute right-0 top-5">
      <IoMdClose
        className="text-slate-500"
        size="15"
        onClick={() => handleDelete(item)}
      />
    </button>
  );
}
