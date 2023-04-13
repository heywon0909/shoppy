import React from "react";
import { SlHandbag } from "react-icons/sl";
import { BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLoginApi } from "../context/LoginContext";
import { getLoginApply } from "../api/ShopServices";
export default function Header() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  const { login, setValidateUser } = useLoginApi();
  const { refetch: loginApply, data: user } = useQuery(
    ["login"],
    getLoginApply,
    {
      enabled: false,
      onSuccess: (data) => {
        console.log("data", data);
        setValidateUser(data);
      },
    }
  );
  const goMyPage = (type) => {
    if (!login) return loginApply();
    if (type === "buying") {
      return navigate("/myPage/order/new");
    } else if (type === "interest") {
      return navigate("myPage/myWishList");
    } else throw new Error("not found page");
  };
  return (
    <header className="w-full border-b border-slate-300 mb-2 p-2 flex justify-center items-center">
      <div className="xl:w-2/3 w-full flex p-2 items-stretch">
        <div
          className="text-2xl grow flex items-center font-sans font-semibold tracking-tighter text-slate-900"
          onClick={goHome}
        >
          SHOPPY
        </div>
        <div className="flex grow flex-row-reverse p-2 mr-5">
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
