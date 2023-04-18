import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoBuyLink({ item }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        className="w-full bg-slate-900 text-white p-2"
        onClick={() => navigate("/myPage/order/new/" + item.id)}
      >
        바로구매
      </button>
    </div>
  );
}
