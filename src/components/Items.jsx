import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Item from "./Item";
export default function Items() {
  const searchAll = async () => {
    return axios
      .get(`http://localhost:3000/data/shoplist.json`)
      .then((res) => res.data.items);
  };
  const { isLoading, data } = useQuery(["items"], searchAll);
  console.log("data", isLoading, data);
  return (
    <section className="flex w-full h-auto mt-10 flex-wrap">
      {!isLoading &&
        data.map((item, index) => {
          return <Item item={item} index={index} />;
        })}
    </section>
  );
}
