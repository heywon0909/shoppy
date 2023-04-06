import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import {
  //   collection,
  query,
  where,
  //   getDocs,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  //   setDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useLoginApi } from "../context/LoginContext";
import { getItem, getMyInterest } from "../api/ShopServices";
export default function ItemDetail() {
  const { id } = useParams();
  const { login } = useLoginApi();
  // eslint-disable-next-line
  const { isLoading: isInterest, data: interest } = useQuery(
    ["exist"],
    () => getMyInterest(id, login.uid),
    { keepPreviousData: false }
  );
  console.log("is", isInterest, interest, id);
  const { isLoading, data } = useQuery(["itemDetail"], () => getItem(id));

  const onAddInterest = async () => {
    // if (login) {
    //   const userCollectionRef = doc(db, "user", "interest");
    //   console.log("user", userCollectionRef);
    //   const q = query(userCollectionRef, where("id", "==", login.uid));
    //   const querySnapShot = await getDoc(q);
    //   console.log("q", querySnapShot.data());
    // }

    const interestCollectionRef = doc(db, "interest", login.uid);
    const docSnap = await getDoc(interestCollectionRef);
    let result = docSnap.data();
    if (!result) {
      const docRef = await setDoc(doc(db, "interest", login.uid), {
        id: login.uid,
        username: login.displayName,
        email: login.email,
        items: [
          {
            id: id,
            title: data.title,
            price: data.price,
            snippet: { ...data.snippet },
          },
        ],
      });
      console.log("doc", docRef);
    } else {
      const frankDocRef = doc(db, "interest", login.uid);
      await updateDoc(frankDocRef, {
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
    }
    console.log("result", result);
  };

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
              {!isInterest && interest ? (
                <BsHeartFill />
              ) : (
                <BsHeart onClick={onAddInterest} />
              )}
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
