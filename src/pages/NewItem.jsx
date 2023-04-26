import React from "react";

export default function NewItem() {
  return (
    <>
      <div className="w-full flex justify-center items-center border-b border-b-zinc-600 p-2">
        <h2 className="font-semibold">새로운 제품 등록</h2>
      </div>
      <section className="flex justify-center p-2 h-screen">
        <article className="w-full max-w-screen-xl flex p-2 justify-center flex-wrap">
          <div className="xl:w-3/6 w-full h-2/3 bg-gray-400">
            <img
              className="h-max w-full"
              title="newProducts"
              alt="newProducts"
            />
          </div>
          <div className="flex flex-col p-2 h-auto xl:w-3/6 w-full">
            <div className="space-y-4 border-b border-zinc-300 pb-4">
              <p className="text-2xl">123</p>
              <p className="text-purple-500 text-2xl">
                {/* {new Intl.NumberFormat("ko-KR").format(data.price)} */}
              </p>
            </div>
            <div className="p-2 border-b border-zinc-300 flex">
              <div className="pt-1">123</div>
              {/* <p className='ml-2 pb-1 text-sm font-semibold text-zinc-500'>{data.heart}+</p> */}
            </div>
            <div className="space-y-4 border-b border-zinc-300 pb-4 h-full">
              <p>설명</p>
              {/* <p className="text-purple-500 text-2xl">하트작업중..</p> */}
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
