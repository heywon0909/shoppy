import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
export default class ShopClient {
  #user = null;
  constructor() {
    this.auth = getAuth();
    this.itemsCollection = collection(db, "shop", "list", "items");
  }
  async signWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(this.auth, provider);
    return true;
  }
  async signWithGoogleLogin() {
    let result = null;
    result = await getRedirectResult(this.auth).then((result) => result?.user);
    console.log("result", result);
    return result;
  }
  async logoutWithGoogleLogin() {
    this.auth.signOut();
    return true;
  }
  init(user) {
    this.#user = user;
  }
  async #initBuyCollection(user) {
    const docSnap = await getDoc(this.#getFirebaseDoc("buy", user));
    return docSnap.data();
  }
  async #initInterestCollection(user) {
    const docSnap = await getDoc(this.#getFirebaseDoc("interest", user));
    console.log('docSnap',docSnap.data())
    return docSnap.data();
  }
  async #initBuyingCollection(user) {
    const docSnap = await getDoc(this.#getFirebaseDoc("buying", user));
    return docSnap.data();
  }
  #setFirebaseDoc(name, user, params) {
    return setDoc(doc(db, name, user?.uid), params);
  }
  #getFirebaseDoc(name, user) {
    return doc(db, name, user.uid);
  }
  // 관심있는 아이템 가져오기
  async getMyInterest(user) {
    return await this.#initInterestCollection(user).then((data) => {
      console.log('data', data);
      return data != null ? data.items : false;
    });
  }
  // 아이템 가져오기
  async getItem() {
    return await getDocs(this.itemsCollection).then((data) =>
      data.docs.map((doc) => ({ ...doc.data() }))
    );
  }
  async getbuyingItem(user) {
    return await this.#initBuyingCollection(user).then((data) => data.items);
  }
  async getbuyItem(user) {
    return await this.#initBuyCollection(user);
  }
  async setMyInterest(user, item) {
    console.log('user', user, item);
    const docSnap = await getDoc(this.#getFirebaseDoc("buying", user));
    console.log('docSnap', docSnap, docSnap.data());
    // const interestCollectionRef = this.#initInterestCollection(user.uid);
    const interestCollectionRef = this.getMyInterest(user);
    console.log('interest',interestCollectionRef,interestCollectionRef==null)
    let result = null;
    if (docSnap.data() == null) {
      console.log('추가')
      result = await this.#setFirebaseDoc("interest", user, {
        id: user.uid,
        username: user.username,
        items: [
          {
            id: item.id,
            title: item.title,
            price: item.price,
            snippet: { ...item.snippet },
          },
        ],
      });
    } else {
      console.log('업데이트')
      const docRef = this.#getFirebaseDoc("interest", user);

      result = await updateDoc(docRef, {
        id: user.uid,
        username: user.username,
        items: arrayUnion({
          id: item.id,
          title: item.title,
          price: item.price,
          snippet: { ...item.snippet },
        }),
      });
    }
    return result == null ? true : false;
  }
  async delMyInterest(user, item) {
    const docRef = this.#getFirebaseDoc("interest", user);
    let result = null;
    result = await updateDoc(docRef, {
      items: arrayRemove({
        id: item.id,
        title: item.title,
        price: item.price,
        snippet: { ...item.snippet },
      }),
    });
    return result == null ? true : false;
  }
  async setMyBuying(user, item) {
    const buyingCollectionRef = this.#initBuyingCollection(user);
    let result = null;
    if (!buyingCollectionRef) {
      result = await this.#setFirebaseDoc("buying", user, {
        id: user.id,
        username: user.displayName,
        items: [
          {
            id: item.id,
            title: item.title,
            price: item.price,
            count: 1,
            snippet: { ...item.snippet },
          },
        ],
      });
    } else {
      const docRef = this.#getFirebaseDoc("buying", user);

      result = await updateDoc(docRef, {
        id: user.uid,
        username: user.username,
        items: arrayUnion({
          id: item.id,
          title: item.title,
          price: item.price,
          snippet: { ...item.snippet },
        }),
      });
    }
    return result == null ? true : false;
  }
  async updateMyBuying(user, item) {
    const docRef = this.#getFirebaseDoc("buying", user);
    const buyingCollectionRef = this.#initBuyingCollection(user);
    let result = null;
    if (!buyingCollectionRef) {
      result = await this.#setFirebaseDoc("buying", user, {
        id: user.id,
        username: user.displayName,
        items: [
          {
            id: item.id,
            title: item.title,
            price: item.price,
            count: 1,
            snippet: { ...item.snippet },
          },
        ],
      });
      return result == null ? true : false;
    }

    let update_result = null;
    result = await updateDoc(docRef, {
      items: arrayRemove({
        id: item.id,
        title: item.title,
        price: item.price,
        count: item.count,
        snippet: { ...item.snippet },
      }),
    });
    if (result == null) {
      update_result = await updateDoc(docRef, {
        id: user.uid,
        username: user.username,
        items: arrayUnion({
          id: item.id,
          title: item.title,
          price: item.price,
          count: item.count + 1,
          snippet: { ...item.snippet },
        }),
      });
    }
    return update_result == null ? true : false;
  }
  async delMyBuying(user, item) {
    const docRef = this.#getFirebaseDoc("buying", user);
    let result = null;
    result = await updateDoc(docRef, {
      items: arrayRemove({
        id: item.id,
        title: item.title,
        price: item.price,
        count: item.count,
        snippet: { ...item.snippet },
      }),
    });
    return result == null ? true : false;
  }
  async setRealBuy(user, items) {
    const buyCollectionRef = this.#initBuyCollection(user);
    let result = null;
    if (!buyCollectionRef) {
      result = await this.#setFirebaseDoc("buy", user, {
        id: user.id,
        username: user.username,
        date: new Date(),
        items: items,
      });
    } else {
      let buyData = await this.getbuyItem(user).then((result) => result.items);

      let originalItems = [];
      let mappedItems = items.map((item) => {
        let find = buyData.find(
          (data) =>
            data.id === item.id &&
            new Date(data.date.seconds * 1000).toLocaleDateString() ===
              item.date.toLocaleDateString()
        );

        if (find) {
          originalItems.push(find);
          return { ...item, count: find.count + 1 };
        } else return item;
      });

      const docRef = this.#getFirebaseDoc("buy", user);
      await updateDoc(docRef, {
        items: arrayRemove(...originalItems),
      });
      result = await updateDoc(docRef, {
        id: user.uid,
        username: user.username,
        date: new Date(),
        items: arrayUnion(...mappedItems),
      });
    }
    return result == null ? true : false;
  }
}
