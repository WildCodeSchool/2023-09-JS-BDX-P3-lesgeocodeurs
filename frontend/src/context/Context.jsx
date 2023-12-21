import { createContext, useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const theContext = createContext();

export function ContextProvider({ children }) {
  // statut de connexion
  const [userConected, setUserConected] = useState(false);
  // information de connexion
  const [logUser, setLogUser] = useState({});
  // information d'inscription
  const [userRegister, setUserRegister] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(false);

  // méthode réutilisable qui stock une clé "key" ayant pour valeur "data" dans le localstorage
  const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleInputRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setIsValidEmail(validator.isEmail(e.target.value));
    }
  };

  const handleLogin = (e) => {
    setLogUser({ ...logUser, [e.target.name]: e.target.value });
  };

  const getRegisterStorage = JSON.parse(localStorage.getItem("userRegister"));
  const getLogStorage = JSON.parse(localStorage.getItem("logUser"));

  const handleSubmitRegister = async () => {
    setStorage("userRegister", userRegister);
    try {
      await axios.post("http://localhost:3000/api/users", {
        userRegister,
      });
    } catch (err) {
      console.error(err);
    }

    Navigate("/login");
  };

  const login = () => {
    setStorage("logUser", logUser);
    if (getRegisterStorage) {
      if (
        getRegisterStorage.email === logUser.email &&
        getRegisterStorage.password === logUser.password
      ) {
        setUserConected(true);
      } else if (
        getRegisterStorage.email !== logUser.email ||
        getRegisterStorage.password !== logUser.password
      ) {
        alert("try again");
        Navigate("/login");
      }
    }
  };

  const logout = () => {
    setUserConected(false);
    localStorage.removeItem("logUser");
  };

  const checkStorage = () => {
    if (getLogStorage) {
      if (
        getLogStorage.email === getRegisterStorage.email &&
        getLogStorage.password === getRegisterStorage.password
      ) {
        setUserConected(true);
      }
    }
  };

  useEffect(() => {
    checkStorage();
  }, []);

  const calculerAge = (dateNaissance) => {
    const [annee, mois, jour] = dateNaissance.split("-").map(Number);

    const dateNaissanceFormat = new Date(annee, mois - 1, jour); // Soustraire 1 au mois car les mois commencent à 0

    const dateActuelle = new Date();
    let age = dateActuelle.getFullYear() - dateNaissanceFormat.getFullYear();

    // Vérifier si l'anniversaire est déjà passé cette année
    const moisActuel = dateActuelle.getMonth() + 1;
    const jourActuel = dateActuelle.getDate();
    const moisAnniversaire = dateNaissanceFormat.getMonth() + 1;
    const jourAnniversaire = dateNaissanceFormat.getDate();

    if (
      moisActuel < moisAnniversaire ||
      (moisActuel === moisAnniversaire && jourActuel < jourAnniversaire)
    ) {
      // eslint-disable-next-line no-plusplus
      age--;
    }

    return age;
  };

  const age = getRegisterStorage?.birthdate
    ? calculerAge(getRegisterStorage.birthDate)
    : null;

  const memoizedUserValue = useMemo(
    () => ({
      userConected,
      setUserConected,
      userRegister,
      setUserRegister,
      handleInputRegister,
      login,
      isValidEmail,
      setIsValidEmail,
      logout,
      checkStorage,
      setStorage,
      handleLogin,
      getRegisterStorage,
      handleSubmitRegister,
      age,
      calculerAge,
    }),
    [
      userConected,
      setUserConected,
      userRegister,
      setUserRegister,
      handleInputRegister,
      login,
      isValidEmail,
      setIsValidEmail,
      logout,
      checkStorage,
      setStorage,
      handleLogin,
      getRegisterStorage,
      handleSubmitRegister,
      age,
      calculerAge,
    ]
  );
  return (
    <theContext.Provider value={memoizedUserValue}>
      {children}
    </theContext.Provider>
  );
}
ContextProvider.propTypes = { children: PropTypes.node.isRequired };
export const useTheContext = () => useContext(theContext);
