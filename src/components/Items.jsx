import React from "react";
import { useQuery } from "@tanstack/react-query";
import Item from "./Item";
import { useShopApi } from "context/ShopContext";

export default function Items() {
  const { shop } = useShopApi();
  const { isLoading: isGetItemsLoading, data } = useQuery(["items"], () =>
    shop.getItem()
  );

  return (
    <section className="flex md:w-2/3 w-full h-auto mt-10 flex-wrap justify-center">
      {!isGetItemsLoading &&
        data.map((item) => {
          return <Item item={item} index={item.id} key={item.id} />;
        })}
      {isGetItemsLoading && (
        <div>
          <img
            src="/assets/image/waiting-icon-gif.jpg"
            title="loading"
            alt="loadingBar"
            className="w-12 h-12"
          />
        </div>
      )}
    </section>
  );
}
