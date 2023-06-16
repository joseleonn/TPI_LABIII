import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState();
  ///////////////////////////////////////

  const toggleLoading = (value) => {
    setIsLoading(value);
  };
  /////////////////////////////
  const value = { isloading, toggleLoading };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
