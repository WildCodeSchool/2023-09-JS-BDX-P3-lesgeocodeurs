import { createContext, useContext, useState, useMemo, useEffect } from "react";
import validator from "validator";
import PropTypes from "prop-types";

const theContext = createContext();

export function ContextProvider({ children }) {
  const [userConected, setUserConected] = useState(false);
  const [userRegister, setUserRegister] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleInputRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setIsValidEmail(validator.isEmail(e.target.value));
    }
  };

  const login = () => {
    setUserConected(true);
  };

  const logout = () => {
    setUserConected(false);
    localStorage.removeItem("user");
  };

  const setStorage = () => {
    localStorage.setItem("user", JSON.stringify(userRegister));
  };
  const checkStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      login();
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
