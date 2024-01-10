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

  const getUserInfos = async () => {
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

  // eslint-disable-next-line consistent-return
  const fetchProtectedData = async () => {
    // Récupérer le JWT du stockage local (ou de tout autre endroit où vous le stockez)
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return null;
    try {
      // Ajouter le JWT à l'en-tête de la requête
      const response = await axios.get("http://localhost:3310/api/check-auth", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Traitement de la réponse ici
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

  // vérifie si on a déjà un compte avec cet adresse mail
  const emailAvailable = async (emailToCheck) => {
    const users = getUsers();
    if (!users.find((userdb) => userdb.email === emailToCheck)) {
      navigate("/register/infos");
    } else {
      alert("Vous êtes déjà inscrit !");
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
    } catch (err) {
      console.error(err);
    }
  };

  // async (newUser) => {
  //   const users = getUsers();

  //   if (!users.find((userdb) => userdb.email === newUser.email)) {
  //     users.push(newUser);
  //     localStorage.setItem("users", JSON.stringify(users));
  //     alert(`Bienvenue ${newUser.firstName} ${newUser.lastName}`);
  //     setUser(newUser);
  //     navigate("/");
  //   } else {
  //     alert("Vous êtes déjà inscrit !");
  //     navigate("/login");
  //   }
  // };

  // déconnexion : vide le state "user"
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfos");
  };

  // modification du profil : modifie le state "user" et le localStorage
  const editUser = async (newData) => {
    const users = getUsers();
    const newUsers = users.map((userdb) =>
      userdb.email === user.email ? newData : userdb
    );
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUser(newData);
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
      emailAvailable,
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
