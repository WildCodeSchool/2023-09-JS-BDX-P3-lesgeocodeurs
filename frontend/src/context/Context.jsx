import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import validator from "validator";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const theContext = createContext();

export function ContextProvider({ children }) {
  const navigate = useNavigate();
  const getUsers = () => JSON.parse(localStorage.getItem("users") ?? "[]");

  // le state qui contient les infos du user connecté
  const [user, setUser] = useState(null);

  // eslint-disable-next-line consistent-return
  const fetchProtectedData = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return null;
    try {
      const response = await axios.get("http://localhost:3310/api/check-auth", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      // eslint-disable-next-line no-restricted-syntax
      console.log("Données protégées:", response.data);
    } catch (error) {
      // Gestion des erreurs ici
      console.error(
        "Erreur lors de la récupération des données protégées:",
        error.message
      );
    }
  };

  const getUserInfos = async () => {
    fetchProtectedData();
    const jwtToken = localStorage.getItem("token");
    const token = jwtDecode(jwtToken);
    const { data } = await axios.get(
      `http://localhost:3310/api/users/${token.id}`
    );
    setUser(data);
    const toLSData = JSON.stringify(data);
    localStorage.setItem("userInfos", toLSData);
  };

  // connexion : vérifie si les identifiants sont bons et met à jour le state "user"
  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3310/api/users/login",
        credentials
      );
      localStorage.setItem("token", data.token);
      getUserInfos();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("wrong cred");
    }
  };

  // inscription : stocke le nouveau user dans le localstorage
  const register = async (newUser) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3310/api/users",
        newUser
      );

      localStorage.setItem("token", data.token);
      navigate("/register/infos");
    } catch (err) {
      if (err.response) {
        const errorResolve = err.response.data.err;
        const token = JSON.stringify(err.response.data.token);
        if (errorResolve === "Compte existant") {
          alert(errorResolve);
          navigate("/login");
        } else if (errorResolve === "Half-register") {
          localStorage.setItem("token", token);
          navigate("/register/infos");
        } else {
          alert(errorResolve);
        }
      } else if (err.request) {
        console.error("Pas de réponse du serveur");
      } else {
        console.error(
          "Erreur lors de la préparation de la requête:",
          err.message
        );
      }
    }
  };
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfos");
  };

  // modification du profil : modifie le state "user" et le localStorage
  const editUser = async (newData) => {
    fetchProtectedData();
    const jwtToken = localStorage.getItem("token");
    const token = jwtDecode(jwtToken);
    try {
      const response = await axios.put(
        `http://localhost:3310/api//users/${token.id}`,
        newData
      );
      console.info(response);
    } catch (err) {
      console.error(err);
    }
  };

  // suppression du compte : vide le state "user" et modifie le localStorage
  const deleteUser = async (emailOfUser) => {
    const users = getUsers();
    const newUsers = users.filter((userdb) => userdb.email !== emailOfUser);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUser(null);
    navigate("/");
  };

  // elle parle d'elle même, c'est bien évidemment moi qui ai tout écris à la main..
  function calculerAge(dateOfBirth) {
    // Convertir la chaîne en objet Date
    const dob = new Date(dateOfBirth);

    // Obtenir la date actuelle
    const currentDate = new Date();

    // Calculer la différence en millisecondes entre la date actuelle et la date de naissance
    const timeDifference = currentDate - dob;

    // Convertir la différence en années
    const ageInMilliseconds = new Date(timeDifference);
    const age = ageInMilliseconds.getUTCFullYear() - 1970;

    return age;
  }

  const memoizedUserValue = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      calculerAge,
      editUser,
      deleteUser,
      fetchProtectedData,
      getUserInfos,
    }),
    [user]
  );

  return (
    <theContext.Provider value={memoizedUserValue}>
      {children}
    </theContext.Provider>
  );
}

ContextProvider.propTypes = { children: PropTypes.node.isRequired };
export const useTheContext = () => useContext(theContext);
