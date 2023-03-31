import React from "react";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="xl:h-3/5 md:h-4/5 h-5/6 w-full relative">
        <img src="../assets/image/main.jpg" alt="mainimage" className="w-full h-full" />
        <div className="absolute w-full h-auto text-center xl:top-28 top-16">
          <p className='xl:text-4xl text-2xl text-zinc-900'>our</p>
          <p className='xl:text-7xl text-4xl text-zinc-900'>MID-SEASON</p>
           <p className='xl:text-7xl text-4xl text-zinc-900'>SALE</p>
        </div>
      </div>
    </div>
  );
}
