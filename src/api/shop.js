export default class Shop {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async search(item) {
    return item ? this.#searchItem : this.#showAll;
  }
  async #searchItem() {
    return this.apiClient.list().then((res) => {
      console.log("res", res);
    });
  }
  async #showAll() {
    return this.apiClient.list().then((res) => {
      console.log("res", res);
    });
  }
}
