import React from "react";
import { BsHeart } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useLoginApi } from "../context/LoginContext";
export default function ItemDetail() {
  const { id } = useParams();
  const { login } = useLoginApi();
  const getItemDetail = async (key) => {
    const itemsCollectionRef = collection(db, "shop", "list", "items");
    const q = query(itemsCollectionRef, where("id", "==", key));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({ ...doc.data() }));
    return newData[0];
  };
  const onAddInterest = async () => {
    const userCollectionRef = doc(db, "user", "interest");
    const docSnap = await getDoc(userCollectionRef);
    console.log("doc", docSnap.data());

    const frankDocRef = doc(db, "user", "interest");
    const result = await updateDoc(frankDocRef, {
      id: login.uid,
      username: login.displayName,
      email: login.email,
      items: arrayUnion({
        id: id,
        title: data.title,
        price: data.price,
        snippet: { ...data.snippet },
      }),
    });
    console.log("result", result);
  };
  const { isLoading, data } = useQuery(["itemDetail"], () => getItemDetail(id));

  return (
    <section className="flex justify-center p-2">
      {!isLoading && (
        <article className="w-full max-w-screen-xl flex p-2 justify-center flex-wrap">
          <div className="xl:w-3/6 w-full h-auto">
            <img
              src={data.snippet.url}
              className="h-max w-full"
              alt={data.title}
            />
          </div>
          <div className="flex flex-col p-2 h-auto xl:w-3/6">
            <div className="space-y-4 border-b border-zinc-300 pb-4">
              <p className="text-2xl">{data.title}</p>
              <p className="text-purple-500 text-2xl">{data.price}</p>
            </div>
            <div className="p-2 space-y-4 border-b border-zinc-300">
              <BsHeart onClick={onAddInterest} />
            </div>
            <div className="space-y-4 border-b border-zinc-300 pb-4 h-full">
              <p>{data.snippet.description}</p>
              <p className="text-purple-500 text-2xl">하트작업중..</p>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
