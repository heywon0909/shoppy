// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithRedirect,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  push,
  update,
  runTransaction,
  remove,
} from "firebase/database";
import { v4 as uuid } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MS_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function signWithGoogle() {
  signInWithRedirect(auth, provider).catch(console.warn);
}
export function signWithGoogleLogin() {
  getRedirectResult(auth).catch(console.warn);
}
export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}
export function logout() {
  signOut(auth).catch(console.error);
}

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(
          "admins",
          admins[0],
          user.uid,
          admins[0]?.slice(1, admins[0].length - 1) === String(user.uid)
        );
        const isAdmin = admins.filter(
          (id) => id?.slice(1, id.length - 1) === String(user.uid)
        );

        return { ...user, isAdmin: isAdmin?.length > 0 ? true : false };
      }
      return user;
    });
}
export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
}
export async function getProducts() {
  return get(ref(database, "products")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => console.log(error));
}
export async function getCarts(user) {
  return get(ref(database, `cart/${user}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("san", snapshot.val(), Object.values(snapshot.val()));
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => console.log(error));
}
export async function addNewCart(product, user) {
  if (!user) return Error("로그인 후 이용가능합니다.");
  console.log("장바구니", product);
  return get(ref(database, `cart/${user}/${product?.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // 수정
        return existInFireBase("cart", snapshot.val(), user);
      } else {
        // 새로 생성
        return set(ref(database, `cart/${user}/${product?.id}`), {
          ...product,
          count: 1,
        });
      }
    })
    .catch((error) => console.error(error));
}

async function existInFireBase(type, product, user) {
  const updates = {};
  updates[`${type}/${user}/${product.id}`] = {
    ...product,
    count: product.count + 1,
  };
  update(ref(database), updates);
}

export async function addMyInterest(product, user) {
  if (!user) return Error("로그인 후 이용가능합니다.");
  console.log("찜하기", product);
  return get(ref(database, `interest/${user}/${product?.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // 수정
        return existInFireBase("interest", snapshot.val(), user);
      } else {
        // 새로 생성
        return set(ref(database, `interest/${user}/${product?.id}`), {
          ...product,
        });
      }
    })
    .catch((error) => console.error(error));
}
export async function getInterest(uid, user) {
  let url = uid === null ? `interest/${user}` : `interest/${user}/${uid}`;
  return get(ref(database, url)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => console.log(error));
}
export async function removeItem(type, uid, user) {
  return set(ref(database, `${type}/${user}/${uid}`), null);
}
export async function addBuy(product, user) {
  if (!user) return Error("로그인 후 이용가능합니다.");
  console.log("결제", product);
  return get(ref(database, `buy/${user}/${new Date().getTime()}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // 수정
        return existInFireBase("buy", snapshot.val(), user);
      } else {
        // 새로 생성
        return set(ref(database, `buy/${user}/${new Date().getTime()}`), {
          items: [...product],
          date: new Date().getTime(),
        });
      }
    })
    .catch((error) => console.error(error));
}
export async function getBuy(uid, user) {
  let url = uid === null ? `buy/${user}` : `buy/${user}/${uid}`;
  return get(ref(database, url)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("snap", snapshot.val());
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => console.log(error));
}
