import { db } from "../firebase/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
export default class ShopClient {
  #userInterestCollection = null;
  #userBuyCollection = null;
  #userBuyingCollection = null;
  #user = null;
  constructor() {
    this.itemsCollection = collection(db, "shop", "list", "items");
  }
  auth(user) {
    this.#user = user;
  }
  #initBuyCollection(user) {
     this.#userBuyCollection = doc(db, "buy", user?.uid);
  }
  #initInterestCollection(user) {
    this.#userInterestCollection = doc(db, "interest", user?.uid);
  }
  #initBuyingCollection(user) {
    this.#userBuyingCollection = doc(db, "buying", user?.uid);
  }
  init(user) {
    this.#user = user;
    this.#userBuyCollection = doc(db, "buy", user?.uid);
    this.#userInterestCollection = doc(db, "interest", user?.uid);
    this.#userBuyingCollection = doc(db, "buying", user?.uid);
  }
  async getItem(id) {
    if (!id) {
      return await getDocs(this.itemsCollection).then((data) =>
        data.docs.map((doc) => ({ ...doc.data() }))
      );
    } else {
      console.log("타니");

      let result = null;
      const userCollectionRef = collection(db, "interest");
      const q = query(userCollectionRef, where("id", "==", this.#user?.uid));

      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        console.log("doc", doc.data().items);
        result = doc.data().items;
      });
      return result;
    }
  }
}
