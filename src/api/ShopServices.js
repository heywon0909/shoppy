import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
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
export const addInterest = async (login, item) => {
  const userCollectionRef = doc(db, "user", "interest");
  try {
    const data = await updateDoc(userCollectionRef, {
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
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getLoginDismiss = async () => {
  const auth = getAuth();
  auth.signOut();
  return true;
};
export const getLoginApply = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let user = null;
  try {
    user = await signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("token", token);
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      return user;
    });
    console.log("user", user);
    return user;
  } catch (error) {
    console.log(error);
  } finally {
    return user;
  }
};
export const getMyInterest = async (id, login = null) => {
  let result = null;
  console.log("id", id);
  try {
    const userCollectionRef = collection(db, "interest");
    const q = query(userCollectionRef, where("id", "==", login));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      result = doc.data().items.filter((item) => item.id === id);
    });
    console.log("타니", result);
    return result == null ? null : result[0];
  } catch (error) {
    console.log(error);
  } finally {
    return result == null ? null : result[0];
  }
};
