import { useState, createContext, useEffect } from "react";
import { me } from "../data/fetch";

export const AuthorContext = createContext();

export default function AuthorContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authorInfo, setAuthorInfo] = useState();
  const getME = async () => {
    try {
      const meInfo = await me();
      setAuthorInfo(meInfo);
    } catch (error) {
      if (error.message === "401") {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  };
  useEffect(() => {
    if (token) getME()
  }
  , [token]);
  const value = { token, setToken, authorInfo };
  return (
    <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
  )
}
