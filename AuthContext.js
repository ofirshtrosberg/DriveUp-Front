import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");

  const login = (token) => {
    setUserToken(token);
  };

  const logout = () => {
    setUserToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
