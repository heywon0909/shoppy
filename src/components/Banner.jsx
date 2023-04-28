import React from "react";

export default function Banner() {
  return (
    <div className="w-full h-4/6 relative">
      <img
        src="/assets/image/main.jpg"
        alt="mainimage"
        className="w-full h-full"
      />
      <div className="absolute w-full h-full text-center top-0 flex flex-col justify-center items-center xl:space-y-9">
        <p className="xl:text-5xl md:text-2xl text-xl text-green-900 font-mono">
          our
        </p>
        <p className="xl:text-6xl md:text-4xl text-3xl text-green-900 font-mono tracking-wide">
          MID-SEASON
        </p>
        <p className="xl:text-7xl md:text-4xl text-4xl text-white font-mono">
          SALE
        </p>
      </div>
    </div>
  );
}
