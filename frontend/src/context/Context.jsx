import { createContext, useContext, useState, useMemo, useEffect } from "react";
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
  const [isValidEmail, setIsValidEmail] = useState(false);

  const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleInputRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    setStorage("userRegister", userRegister);
    if (e.target.name === "email") {
      setIsValidEmail(validator.isEmail(e.target.value));
    }
  };

  const handleLogin = (e) => {
    setLogUser({ ...logUser, [e.target.name]: e.target.value });
    setStorage("logUser", logUser);
  };

  const getRegisterStorage = JSON.parse(localStorage.getItem("userRegister"));
  const getLogStorage = JSON.parse(localStorage.getItem("logUser"));

  const login = () => {
    if (getRegisterStorage) {
      if (
        getRegisterStorage.email === logUser.email &&
        getRegisterStorage.password === logUser.password
      ) {
        setUserConected(true);
      }
    }
  };

  const logout = () => {
    setUserConected(false);
    // localStorage.removeItem("user");
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
