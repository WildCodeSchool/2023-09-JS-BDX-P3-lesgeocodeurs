/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const theContext = createContext();

export function ContextProvider({ children }) {
  const [userConected, setUserConected] = useState(false);
  const [userRegister, setUserRegister] = useState({});

  const handleInputRegister = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  return (
    <theContext.Provider
      value={{
        userConected,
        setUserConected,
        userRegister,
        setUserRegister,
        handleInputRegister,
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
