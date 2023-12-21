import { createContext, useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import PropTypes from "prop-types";

const theContext = createContext();

export function ContextProvider({ children }) {
  // statut de connexion
  const [userConected, setUserConected] = useState(false);
  // information de connexion
  const [logUser, setLogUser] = useState({});
  // information d'inscription
  const [userRegister, setUserRegister] = useState({});
  // validation de l'email du register/log
  const [isValidEmail, setIsValidEmail] = useState(false);

  // méthode réutilisable qui stock une clé "key" ayant pour valeur "data" dans le localstorage
  const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  // méthode qui stock les champs input du register et qui toggle isValid email
  const handleInputRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setIsValidEmail(validator.isEmail(e.target.value));
    }
  };
  // * pour les logs user dans la partie connection
  const handleLogin = (e) => {
    setLogUser({ ...logUser, [e.target.name]: e.target.value });
  };

  // // récupère et stock ce qui est à la clé userRegister dans le localstorage || en cours post =>> back
  const handleSubmitRegister = async () => {
    setStorage("userRegister", userRegister);
    try {
      await axios.post("http://localhost:3310/api/users", {
        userRegister,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // récupère et stock ce qui est à la clé userRegister dans le localstorage
  const getRegisterStorage = JSON.parse(localStorage.getItem("userRegister"));

  const login = () => {
    // récupère et stock ce qui est à la clé logUser dans le localstorage
    setStorage("logUser", logUser);
    // vérifie l'existence d'un utilistateur enregistré
    if (getRegisterStorage) {
      // si c'est le cas compare l'email et le mot de passe de ce dernier avec la somme des inputs de login stocké dans logUser pour connecter l'utilisateur
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
      }
    }
  };

  // récupère et stock ce qui est stocké à la clé logUser dans le localstorage
  const getLogStorage = JSON.parse(localStorage.getItem("logUser"));

  // déconnecte l'user et suppr le localstorage à la clé logUser
  const logout = () => {
    setUserConected(false);
    localStorage.removeItem("logUser");
  };

  // Permet de reconnecter automatiquemennt l'utilisateur à chaque visite tant qu'il ne s'est pas déconnecté
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

  // elle parle d'elle même, c'est bien évidemment moi qui ai tout écris à la main..
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
