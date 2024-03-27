import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api`;

const getToken = () => localStorage.getItem("token");

const setToken = (token) => localStorage.setItem("token", token);

// getConfig return une config(qui sera un objet avec une clé "headers" et un objet en valeur), ici la validation d'authorization à savoir on récupere le token dans le local storage si il existe et on ajoute "Authorization = `Bearer ${token}`" comme propriété de la clé "headers"
const getConfig = () => {
  const config = { headers: {} };
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const get = async (endpoint) => {
  try {
    // axios.get = 2paramètres (le premier obligatoire :url à appeler , le deuxième facultatif: la configuration ici getConfig )
    const response = await axios.get(baseUrl + endpoint, getConfig());
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const post = async (endpoint, content) => {
  try {
    const response = await axios.post(baseUrl + endpoint, content, getConfig());
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const put = async (endpoint, content) => {
  try {
    const response = await axios.put(baseUrl + endpoint, content, getConfig());
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// prettier-ignore
const del = async (endpoint) => {
  const response = await axios.delete(baseUrl + endpoint, getConfig());
  return response.data;
}

export default {
  getToken,
  setToken,
  getConfig,
  get,
  post,
  put,
  del,
};
