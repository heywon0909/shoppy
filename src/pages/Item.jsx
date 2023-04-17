import React from "react";
import ItemDetail from "../components/ItemDetail";
import { useParams } from "react-router-dom";
import { useLoginApi } from "../context/LoginContext";
import { useQuery } from "@tanstack/react-query";
export default function Item() {
  const { id } = useParams();
  const { shop } = useLoginApi();
  const { isLoading, data } = useQuery(["itemDetail"], () => shop.getItem(id));
  return (
    <>
      <ItemDetail id={id} data={data} isLoading={isLoading} />
    </>
  );
}
