import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [tokenExpTime, setTokenExpTime] = useState("");
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("Token stored successfully");
    } catch (error) {
      console.log("Error storing token:", error);
    }
  };
  const login = (token) => {
    setUserToken(token);
    storeToken(token);
  };

  const logout = () => {
    setUserToken("");
    storeToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        tokenExpTime,
        userToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
