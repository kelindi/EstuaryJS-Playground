'use client';
import { createContext, useState, useContext } from "react";

const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const value = {
    query,
    setQuery,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };