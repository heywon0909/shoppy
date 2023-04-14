export default class Shop {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async getItem(id) {
    return this.apiClient.getItem(id);
  }
  async #showAll() {
    return this.apiClient.getItems();
  }
  async onAddInterest(login, item) {
    return this.apiClient.addInterest(login, item);
  }
  async login(user) {
    return this.apiClient.init(user);
  }
  async logout() {
    return this.apiClient.getLoginDismiss();
  }
}
