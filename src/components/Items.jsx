import React from "react";
import { useQuery } from "@tanstack/react-query";
import Item from "./Item";
import { getProducts } from "api/firebase";

export default function Items() {
  // const { shop } = useShopApi();
  const {
    isLoading: isGetItemsLoading,
    error,
    data: products,
  } = useQuery(["items"], getProducts);

  return (
    <section className="flex xl:w-9/12  md:w-2/3 w-full h-full mt-10 flex-wrap justify-center">
      {!isGetItemsLoading &&
        products.map((product) => {
          return <Item item={product} index={product.id} key={product.id} />;
        })}
      {error && <div>not found</div>}
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
