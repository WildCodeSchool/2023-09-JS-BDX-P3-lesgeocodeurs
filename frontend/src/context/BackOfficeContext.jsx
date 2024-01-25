// import { createContext, useEffect, useMemo } from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";

// const theBackOfficeContext = createContext();

// export function ContextProvider({ children }) {
//   const navigate = useNavigate();
//   const theLoaderData = useLoaderData();
//   useEffect(() => {}, []);
//   const memoizedUserValue = useMemo(() => {}, []);
//   return (
//     <theBackOfficeContext.Provider value={memoizedUserValue}>
//       {children}
//     </theBackOfficeContext.Provider>
//   );
// }

// ContextProvider.propTypes = { children: PropTypes.node.isRequired };
// export const useTheContext = () => useContext(theBackOfficeContext);
