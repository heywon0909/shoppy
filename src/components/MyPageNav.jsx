import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyPageNav() {
  const navigate = useNavigate();

  return (
    <div className="xl:w-1/3 w-full">
      <div className="xl:pt-10 space-y-6 w-auto">
        <div>
          <p className="text-md font-semibold">나의 주문 내역</p>
          <ul>
            <li className="text-sm" onClick={() => navigate("/secured/mypage/myPage")}>마이페이지</li>
          </ul>
        </div>
        <div>
          <p className="text-md font-semibold">나의 활동</p>
          <ul>
            <li
              className="text-sm"
              onClick={() => navigate("/myPage/myWishList")}
            >
              위시리스트
            </li>
          </ul>
        </div>
        <div>
          <p className="text-md font-semibold">나의 주문하기</p>
          <ul>
            <li
              className="text-sm"
              onClick={() => navigate("/myPage/order/cart")}
            >
              장바구니
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
