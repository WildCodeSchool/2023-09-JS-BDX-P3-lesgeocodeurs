/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";

const theContext = createContext();

export function ContextProvider({ children }) {
  const [userConected, setUserConected] = useState({
    user: false,
    admin: false,
  });
  const [userRegister, setUserRegister] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleInputRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    if (userRegister.email) {
      setIsValidEmail(validator.isEmail(userRegister.email));
    }
  };

  const login = (e) => {
    e.preventDefault();
    setUserConected({ user: true, admin: false });
  };

  const logout = (e) => {
    e.preventDefault();
    setUserConected({ user: false, admin: false });
  };
  // localStorage.getItem("userValues")? user.find(() => comparer mail avec dbmail et si ça match setUserConected({ user: true }) ): elsehere;
  // localStorage.setItem("userRegister")
  return (
    <theContext.Provider
      value={{
        userConected,
        setUserConected,
        userRegister,
        setUserRegister,
        handleInputRegister,
        login,
        logout,
        isValidEmail,
        setIsValidEmail,
      }}
    >
      {children}
    </theContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  userConected: PropTypes.bool.isRequired,
};

export const useTheContext = () => useContext(theContext);
