export default class Shop {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  // 상품 조회
  async getItem(id) {
    return this.apiClient.getItem().then((result) => {
      if (id) {
        return result.filter((item) => item.id === id)?.[0];
      }
      return result;
    });
  }
  async getInterest(user, id = null) {
    return this.apiClient.getMyInterest(user).then((result) => {
      if (result) {
        if (id) {
          const item = result.filter((item) => item.id === id);
          if (item?.length > 0) return item;
          else return [];
        }
      }

      return result;
    });
  }
  async getBuying(user) {
    return this.apiClient.getbuyingItem(user);
  }
  async getPurchasedItems(user) {
    return this.apiClient.getbuyItem(user);
  }
  async addInterest(user, item) {
    return await this.apiClient.setMyInterest(user, item);
  }
  async delInterest(user, item) {
    return await this.apiClient.delMyInterest(user, item);
  }
  async addBuying(user, item) {
    return await this.apiClient.setMyBuying(user, item);
  }
  async delBuying(user, item) {
    return await this.apiClient.delMyBuying(user, item);
  }
  async updateBuying(user, item) {
    return await this.apiClient.updateMyBuying(user, item);
  }
  async buyItem(user, item) {
    return await this.apiClient.setRealBuy(user, item);
  }
  async auth(user) {
    return this.apiClient.init(user);
  }
  authRequired() {
    return this.apiClient.isAuth();
  }
  async login() {
    return this.apiClient.signWithGoogleLogin();
  }
  async logout() {
    this.apiClient.reInit();
    return this.apiClient.logoutWithGoogleLogin();
  }
  async loginToGoogle() {
    return this.apiClient.signWithGoogle();
  }
}
