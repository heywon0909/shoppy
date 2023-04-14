import React from "react";
import { useQuery } from "@tanstack/react-query";
import Item from "./Item";
import { useLoginApi } from "../context/LoginContext";

export default function Items() {
  const { shop } = useLoginApi();
  const { isLoading, data } = useQuery(["items"], () => shop.getItem(), {
    staleTime: 1000 * 60 * 1,
  });

  return (
    <section className="flex md:w-2/3 w-full h-auto mt-10 flex-wrap justify-center">
      {!isLoading &&
        data.map((item, index) => {
          return <Item item={item} index={item.id} key={item.id} />;
        })}
    </section>
  );
}
