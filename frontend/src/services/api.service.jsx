import axios from "axios";

class ApiService {
  #token;

  constructor() {
    this.#token = localStorage.getItem("token");
  }

  getToken() {
    return this.#token;
  }

  setToken(token) {
    this.#token = token;

    return this;
  }

  getConfig() {
    const config = { headers: {} };

    if (this.#token) {
      config.headers.Authorization = `Bearer ${this.#token}`;
    }

    return config;
  }

  async get(url) {
    return axios.get(url, this.getConfig());
  }

  async post(url, content) {
    const { data } = await axios.post(url, content, this.getConfig());
    return data;
  }
}

const apiService = new ApiService();

export default apiService;
