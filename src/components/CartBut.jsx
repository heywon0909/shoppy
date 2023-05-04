import useCarts from "hooks/useCarts";
import React from "react";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";
export default function CartBut() {
  const {
    cartsQuery: { data: items },
  } = useCarts();
  const hasCartItems = items && items.length > 0;
  return (
    <Link
      className={hasCartItems ? "relative ml-2" : " ml-2"}
      to="/myPage/order/cart"
    >
      <SlHandbag size="20" className="text-slate-900" />
      {hasCartItems && (
        <div className="absolute top-4 left-2 w-5 h-5 -pt-2 bg-purple-600 rounded-full text-white flex justify-center text-sm">
          <p>{items.length}</p>
        </div>
      )}
    </Link>
  );
}
