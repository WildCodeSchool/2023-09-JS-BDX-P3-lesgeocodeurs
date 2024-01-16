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
    try {
      const response = await axios.get(url, this.getConfig());
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async post(url, content) {
    try {
      const response = await axios.post(url, content, this.getConfig());
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async put(url, content) {
    try {
      const response = await axios.put(url, content, this.getConfig());
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

const apiService = new ApiService();
export default apiService;
