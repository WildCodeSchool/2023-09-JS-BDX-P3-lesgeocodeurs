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

  // connexion : vérifie si les identifiants sont bons et met à jour le state "user"
  const login = async (credentials) => {
    // const users = getUsers();
    try {
      const { data } = await axios.post(
        "http://localhost:3310/api/users/login",
        credentials
      );
      localStorage.setItem("token", data.token);
      const tokenData = jwtDecode(data.token);
      setUser(tokenData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }

    // if (token) {
    //   // si user trouvé, le connecte, sinon affiche message d'erreur
    //   setUser(token);
    //   navigate("/");
    // } else {
    //   alert("Identifiants incorrects");

    // }
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
    const users = getUsers();

    if (!users.find((userdb) => userdb.email === newUser.email)) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert(`Bienvenue ${newUser.firstName} ${newUser.lastName}`);
      setUser(newUser);
      navigate("/");
    } else {
      alert("Vous êtes déjà inscrit !");
      navigate("/login");
    }
  };

  // déconnexion : vide le state "user"
  const logout = async () => setUser(null);

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
