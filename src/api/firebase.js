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
import { getDatabase, ref, get } from "firebase/database";

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