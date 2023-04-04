import axios from "axios";
export default class FakeShopClient {
  async list() {
    return axios.get(`/data/shoplist.json`);
  }
}
