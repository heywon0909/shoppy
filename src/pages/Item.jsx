import React from "react";
import ItemDetail from "components/ItemDetail";
import { useParams } from "react-router-dom";
import { useShopApi } from "context/ShopContext";
import { useQuery } from "@tanstack/react-query";
export default function Item() {
  const { id } = useParams();
  const { shop } = useShopApi();
  const { isLoading, data } = useQuery(["itemDetail"], () => shop.getItem(id));
  return (
    <>
      <ItemDetail id={id} data={data} isLoading={isLoading} />
    </>
  );
}
