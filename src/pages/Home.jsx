import React from "react";
import Items from "../components/Items";
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col" id="grid">
      <div className="w-full h-1/3 relative">
        <img
          src="../assets/image/main.jpg"
          alt="mainimage"
          className="w-full h-full"
        />
        <div className="absolute w-full h-full text-center top-0 flex flex-col justify-center items-center space-y-2">
          <div>
            <p className="xl:text-3xl md:text-2xl text-xl text-zinc-50">our</p>
            <p className="xl:text-5xl md:text-4xl text-3xl text-zinc-50">
              MID-SEASON
            </p>
            <p className="xl:text-5xl md:text-4xl text-3xl text-zinc-50">
              SALE
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Items />
      </div>
    </div>
  );
}
