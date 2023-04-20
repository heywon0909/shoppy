import React from "react";
import ItemDetail from "components/ItemDetail";
import { useParams } from "react-router-dom";
import { useShopApi } from "context/ShopContext";
import { useQuery } from "@tanstack/react-query";
export default function Item() {
  const { id } = useParams();
  console.log("id", id);
  const { shop } = useShopApi();
  const { isLoading: isItemRefreshing, data } = useQuery(["itemDetail"], () =>
    shop.getItem(id)
  );
  return (
    <>
      <ItemDetail id={id} data={data} isItemRefreshing={isItemRefreshing} />
    </>
  );
}
