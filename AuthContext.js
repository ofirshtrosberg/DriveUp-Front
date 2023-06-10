import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [tokenExpTime, setTokenExpTime] = useState("");
  useEffect(() => {
    console.log("userToken now:", userToken);
  }, [userToken]);
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("Token changed in storage successfully");
    } catch (error) {
      console.log("Error storing token");
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
