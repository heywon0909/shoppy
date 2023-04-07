import React from "react";

export default function MyShopInterest() {
  return (
    <div className="p-2 grow-0 flex flex-wrap">
      <div className="p-2 flex w-full flex-wrap h-24">
        <div className="w-24 h-24 bg-slate-300 rounded-full"></div>
        <div className="flex flex-col p-2 h-24">
          <p>박혜원 님</p>
          <div className="flex text-sm text-zinc-600 flex-wrap">
            누적 구매 금액
            <p className="font-semibold">77,000 원</p>
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex flex-col">
        <table class="table-auto text-sm">
          <thead className="border-b border-zinc-600 pb-3">
            <tr>
              <th>상품정보</th>
              <th>수량</th>
              <th>주문금액</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-300">
              <td>
                <div className="flex p-2">
                  <div class=" h-32 w-24 bg-slate-300"></div>
                  <div class="flex flex-col p-2 h-24">
                    <p className="text-sm">반팔데님</p>
                    <div class="flex text-sm text-zinc-600 flex-wrap">1개</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="text-sm p-2 h-24 text-center">1개</div>
              </td>
              <td>
                <div className="text-sm p-2 h-24 text-center">49,000원</div>
              </td>
            </tr>
            <tr className="border-b border-zinc-300">
              <td>
                <div className="flex p-2">
                  <div class=" h-32 w-24 bg-slate-300"></div>
                  <div class="flex flex-col p-2 h-24">
                    <p className="text-sm">반팔데님</p>
                    <div class="flex text-sm text-zinc-600 flex-wrap">1개</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="text-sm p-2 h-24 text-center">1개</div>
              </td>
              <td>
                <div className="text-sm p-2 h-24 text-center">49,000원</div>
              </td>
            </tr>
            <tr className="border-b border-zinc-300">
              <td>
                <div className="flex p-2">
                  <div class=" h-32 w-24 bg-slate-300"></div>
                  <div class="flex flex-col p-2 h-24">
                    <p className="text-sm">반팔데님</p>
                    <div class="flex text-sm text-zinc-600 flex-wrap">1개</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="text-sm p-2 h-24 text-center">1개</div>
              </td>
              <td>
                <div className="text-sm p-2 h-24 text-center">49,000원</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
