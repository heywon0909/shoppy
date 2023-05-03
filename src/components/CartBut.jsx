import { useQuery } from "@tanstack/react-query";
import useCarts from "hooks/useCarts";
import React from "react";
import { SlHandbag } from "react-icons/sl";
export default function CartBut({ onClick }) {
  const {
    cartsQuery: { data: items },
  } = useCarts();

  return (
    <button className="relative ml-2" onClick={() => onClick("buying")}>
      <SlHandbag size="20" className="text-slate-900" />
      <div className="absolute top-4 left-2 w-5 h-5 -pt-2 bg-purple-600 rounded-full text-white flex justify-center text-sm">
        {items && <p>{items.length}</p>}
      </div>
    </button>
  );
}
