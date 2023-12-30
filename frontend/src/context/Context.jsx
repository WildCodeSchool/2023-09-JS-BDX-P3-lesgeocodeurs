import { createContext, useContext, useState, useMemo } from "react";
// import axios from "axios";
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
  const login = (credentials) => {
    const users = getUsers();

    // cherche un user avec cet email et mot de passe
    const userFound = users.find(
      (userdb) =>
        userdb.email === credentials.email &&
        userdb.password === credentials.password
    );

    if (userFound) {
      // si user trouvé, le connecte, sinon affiche message d'erreur
      setUser(userFound);
      navigate("/");
    } else {
      alert("Identifiants incorrects");
      navigate("/login");
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
    const users = getUsers();

    if (!users.find((userdb) => userdb.email === newUser.email)) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert(`Bienvenue ${newUser.firstName} ${newUser.name}`);
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
  const calculerAge = (dateNaissance) => {
    const [annee, mois, jour] = dateNaissance.split("-").map(Number);

    // Soustraire 1 au mois car les mois commencent à 0
    const dateNaissanceFormat = new Date(annee, mois - 1, jour);

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
