import React from "react";
import Items from "components/Items";
import Banner from "components/Banner";
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col" id="grid">
      <Banner />
      <div className="w-full flex justify-center">
        <Items />
      </div>
    </div>
  );
}
