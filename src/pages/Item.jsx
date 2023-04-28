import React from "react";
import ItemDetail from "components/ItemDetail";
import { useLocation, useParams } from "react-router-dom";

export default function Item() {
  const { id } = useParams();

  const {
    state: { item },
  } = useLocation();

  return <>{item && <ItemDetail id={id} item={item} />}</>;
}
