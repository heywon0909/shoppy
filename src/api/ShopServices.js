import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import {
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
export const getItems = async () => {
  const itemsCollectionRef = collection(db, "shop", "list", "items");
  try {
    const data = await getDocs(itemsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data() }));
  } catch (error) {
    console.log(error);
  }
};
export const getItem = async (id) => {
  const itemsCollectionRef = collection(db, "shop", "list", "items");
  try {
    const q = query(itemsCollectionRef, where("id", "==", id));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({ ...doc.data() }));
    return newData[0];
  } catch (error) {
    console.log(error);
  }
};
export const getLoginDismiss = async () => {
  const auth = getAuth();
  auth.signOut();
  return true;
};
export const signWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
  return true;
};
export const getLoginApply = async () => {
  let user = null;
  try {
    const auth = getAuth();
    user = await getRedirectResult(auth).then((result) => {
      return result?.user;
    });
    console.log("user", user);

    //   user = await getRedirectResult(auth).then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     console.log("token", token);
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //     return user;
    //   });
    //   console.log("user", user);
    //   return user;
    return user;
  } catch (error) {
    console.log(error);
  } finally {
    return user;
  }
};
export const getMyInterest = async (id, login = null) => {
  let result = null;

  try {
    const userCollectionRef = collection(db, "interest");
    const q = query(userCollectionRef, where("id", "==", login));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log("doc", doc.data().items);
      result = doc.data().items;
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};
export const setMyInterest = async (item, login) => {
  let result = null;
  try {
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
            id: item.id,
            title: item.title,
            price: item.price,
            snippet: { ...item.snippet },
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
          id: item.id,
          title: item.title,
          price: item.price,
          snippet: { ...item.snippet },
        }),
      });
    }
    return (result = true);
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};
export const delMyInterest = async (item, login) => {
  let result = null;
  try {
    const docRef = doc(db, "interest", login.uid);
    result = await updateDoc(docRef, {
      items: arrayRemove({
        id: item.id,
        title: item.title,
        price: item.price,
        snippet: { ...item.snippet },
      }),
    });
    return result == null ? true : false;
  } catch (error) {
    console.log(error);
  } finally {
    return result == null ? true : false;
  }
};
export const addBuyingItem = async (item, login) => {
  let result = null;
  try {
    const buyingCollectionRef = doc(db, "buying", login.uid);
    const docSnap = await getDoc(buyingCollectionRef);
    let dataList = docSnap.data();
    if (dataList) {
      result = await updateDoc(buyingCollectionRef, {
        id: login.uid,
        username: login.displayName,
        email: login.email,
        items: arrayUnion({
          id: item.id,
          title: item.title,
          price: item.price,
          snippet: { ...item.snippet },
        }),
      });
    } else {
      result = await setDoc(doc(db, "buying", login.uid), {
        id: login.uid,
        username: login.displayName,
        email: login.email,
        items: [
          {
            id: item.id,
            title: item.title,
            price: item.price,
            snippet: { ...item.snippet },
          },
        ],
      });
    }

    return result == null ? true : false;
  } catch (error) {
    console.log(error);
  } finally {
    return result == null ? true : false;
  }
};
export const getBuyingItem = async (login = null) => {
  console.log("타니");
  let result = null;

  try {
    const userCollectionRef = collection(db, "buying");
    const q = query(userCollectionRef, where("id", "==", login));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log("doc", doc.data());
      result = doc.data().items;
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};
export const delBuyingItem = async (item, login) => {
  let result = null;
  try {
    const docRef = doc(db, "buying", login.uid);
    result = await updateDoc(docRef, {
      items: arrayRemove({
        id: item.id,
        title: item.title,
        price: item.price,
        snippet: { ...item.snippet },
      }),
    });
    return result == null ? true : false;
  } catch (error) {
    console.log(error);
  } finally {
    return result == null ? true : false;
  }
};
export const buyItem = async (item, login) => {
  let result = null;
  try {
    const buyCollectionRef = doc(db, "buy", login.uid);
    const docSnap = await getDoc(buyCollectionRef);
    let dataList = docSnap.data();
    if (dataList) {
      result = await updateDoc(buyCollectionRef, {
        id: login.uid,
        date: new Date().toLocaleDateString(),
        username: login.displayName,
        email: login.email,
        items: arrayUnion(...item),
      });
    } else {
      result = await setDoc(doc(db, "buy", login.uid), {
        id: login.uid,
        date: new Date().toLocaleDateString(),
        username: login.displayName,
        email: login.email,
        items: item,
      });
    }

    return result == null ? true : false;
  } catch (error) {
    console.log(error);
  } finally {
    return result == null ? true : false;
  }
};
export const getBuyItem = async (login = null) => {
  let result = null;

  try {
    const buyCollectionRef = collection(db, "buy");
    const q = query(buyCollectionRef, where("id", "==", login));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log("doc", doc.data());
      result = doc.data();
    });

    return result == null ? true : result;
  } catch (error) {
    console.log(error);
  } finally {
    return result == null ? true : result;
  }
};
