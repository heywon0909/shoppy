export default class Shop {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async search(id) {
    return id ? this.#searchItem : this.#showAll;
  }
  async #searchItem(id) {
    return this.apiClient.getItem(id);
  }
  async #showAll() {
    return this.apiClient.getItems();
  }
  async onAddInterest(login, item) {
    return this.apiClient.addInterest(login, item);
  }
  async login() {
    return this.apiClient.getLoginApply();
  }
  async logout() {
    return this.apiClient.getLoginDismiss();
  }
}
