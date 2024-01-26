import axios from "axios";

class ApiService {
  #token;

  constructor() {
    this.#token = localStorage.getItem("token");
    this.baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api`;
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

  async get(endpoint) {
    try {
      const response = await axios.get(
        this.baseUrl + endpoint,
        this.getConfig()
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async post(endpoint, content) {
    try {
      const response = await axios.post(
        this.baseUrl + endpoint,
        content,
        this.getConfig()
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async put(endpoint, content) {
    try {
      const response = await axios.put(
        this.baseUrl + endpoint,
        content,
        this.getConfig()
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(endpoint) {
    const response = await axios.delete(
      this.baseUrl + endpoint,
      this.getConfig()
    );
    return response.data;
  }
}

export default ApiService;
