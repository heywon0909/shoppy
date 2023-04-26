import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { db } from "./firebase";
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
  #auth = getAuth();
  constructor() {
    this.itemsCollection = collection(db, "shop", "list", "items");
  }
  async signWithGoogle() {
    console.log("this", this.auth);
    const provider = new GoogleAuthProvider();

    await signInWithRedirect(this.#auth, provider);
    return true;
  }
  async signWithGoogleLogin() {
    let result = null;
    console.log("this.auth", this.#auth);
    result = await getRedirectResult(this.#auth)
      .then((result) => {
        console.log("result", result);
        return result.user;
      })
      .catch((error) => console.warn(error));

    return result;
  }
  async logoutWithGoogleLogin() {
    const auth = getAuth();
    auth.signOut();

    return true;
  }
  init(user) {
    if (user) {
      this.#user = user;
      sessionStorage.setItem("shoppy", JSON.stringify(user));
    } else {
      this.reInit();
    }
  }
  reInit() {
    sessionStorage.removeItem("shoppy");
  }
  isAuth() {
    return JSON.parse(sessionStorage.getItem("shoppy"));
  }
  async #initBuyCollection(user) {
    return await getDoc(this.#getFirebaseDoc("buy", user));
  }
  async #initInterestCollection(user) {
    return await getDoc(this.#getFirebaseDoc("interest", user));
  }
  async #initBuyingCollection(user) {
    return await getDoc(this.#getFirebaseDoc("buying", user));
  }
  #setFirebaseDoc(name, user, params) {
    return setDoc(doc(db, name, user?.uid), params);
  }
  #getFirebaseDoc(name, user) {
    return doc(db, name, user.uid);
  }
  // 관심있는 아이템 가져오기
  async getMyInterest(user) {
    let result = (await this.#initInterestCollection(user)).data();
    return result?.items;
  }
  // 아이템 가져오기
  async getItem() {
    return await getDocs(this.itemsCollection).then((data) =>
      data.docs.map((doc) => ({ ...doc.data() }))
    );
  }
  async getbuyingItem(user) {
    let result = (await this.#initBuyingCollection(user)).data();
    return result.items;
  }
  async getbuyItem(user) {
    let result = (await this.#initBuyCollection(user)).data();
    return result;
  }
  async setMyInterest(user, item) {
    const interestCollectionData = (
      await this.#initInterestCollection(user)
    ).data();
    let result = null;
    if (interestCollectionData == null) {
      // 새로 넣기
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
      // 업데이트
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
    const buyingCollectionRef = (await this.#initBuyingCollection(user)).data();
    let result = null;

    // 새로 추가
    if (buyingCollectionRef == null) {
      result = await this.#setFirebaseDoc("buying", user, {
        id: user.uid,
        username: user.username,
        items: [
          {
            id: item.id,
            title: item.title,
            price: item.price,
            heart: 0,
            count: 1,
            snippet: { ...item.snippet },
          },
        ],
      });
      // 업데이트
    } else {
      let itemArr = [item];
      let buyingData = await this.getbuyingItem(user);
      let originalItems = [];
      let mappedItems = itemArr.map((item) => {
        let find = buyingData?.find((data) => data.id === item.id);
        if (find) {
          originalItems.push(find);

          return { ...item, count: find.count == null ? 1 : find.count + 1 };
        } else return { ...item, count: 1 };
      });

      // 기존 데이터 삭제
      const docRef = this.#getFirebaseDoc("buying", user);
      await updateDoc(docRef, {
        items: arrayRemove(...originalItems),
      });
      // 변경하여 추가
      result = await updateDoc(docRef, {
        id: user.uid,
        username: user.username,
        items: arrayUnion(...mappedItems),
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
        heart: item.heart,
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
          heart: item.heart,
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
    let mappedItems = Array.isArray(item) ? item : [item];
    let result = null;
    result = await updateDoc(docRef, {
      items: arrayRemove(...mappedItems),
    });
    return result == null ? true : false;
  }
  async setRealBuy(user, items) {
    const buyCollectionRef = (await this.#initBuyCollection(user)).data();

    let result = null;
    if (buyCollectionRef == null) {
      // 새로추가
      result = await this.#setFirebaseDoc("buy", user, {
        id: user.uid,
        username: user.username,
        items: items,
      });
    } else {
      // 업데이트
      let buyData = await this.getbuyItem(user).then((result) => result.items);

      let originalItems = [];
      let mappedItems = items.map((item) => {
        let find = buyData?.find(
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
      if (originalItems?.length > 0) {
        await updateDoc(docRef, {
          items: arrayRemove(...originalItems),
        });
      }

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
