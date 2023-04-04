import React from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
// import axios from "axios";
import Item from "./Item";

export default function Items() {
  const itemsCollectionRef = collection(db, "shop", "list", "items");
  //   useEffect(() => {
  //     const getItems = async () => {
  //       const data = await getDocs(itemsCollectionRef);
  //       data.forEach((doc) => {
  //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //       });
  //       return data;
  //     };
  //     getItems();
  //   });
  const getItems = async () => {
    const data = await getDocs(itemsCollectionRef);
    const newData = data.docs.map((doc) => ({ ...doc.data() }));
    return newData;
  };
  //   const searchAll = async () => {
  //     return axios
  //       .get(`http://localhost:3000/data/shoplist.json`)
  //       .then((res) => res.data.items);
  //   };
  const { isLoading, data } = useQuery(["items"], getItems);
  console.log("data", data);
  return (
    <section className="flex md:w-2/3 w-full h-auto mt-10 flex-wrap">
      {!isLoading &&
        data.map((item, index) => {
          return <Item item={item} index={item.id} key={item.id} />;
        })}
    </section>
  );
}
