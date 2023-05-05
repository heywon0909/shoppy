import React from "react";
import Item from "./Item";
import useItems from "hooks/useItems";

export default function Items() {
  const {
    itemsQuery: { isLoading: isGetItemsLoading, error, data: products },
  } = useItems();
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
            src="/assets/image/CVyf.gif"
            title="loading"
            alt="loadingBar"
            className="w-60 h-36"
          />
        </div>
      )}
    </section>
  );
}
