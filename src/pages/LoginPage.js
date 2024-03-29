import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { URLSearchParams } from "react-native-url-polyfill";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors";
import { IP, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearStackAndNavigate } from "../helperFunctions/accessToBackFunctions";
import {
  isUserExistLocal,
  addUserLocal,
  deleteUserLocal,
} from "../../AsyncStorageUsers";
import { printUsersLocal } from "../../AsyncStorageUsers";
export default function LoginPage({ navigation }) {
  const { userToken, login, logout } = useContext(AuthContext);
  const [loginResponse, setLoginResponse] = useState("");
  const [navigateNow, setNavigateNow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  const handleLoginLocal = async (token) => {
    const isUserExist = await isUserExistLocal(email);
    console.log("isUserExist", isUserExist);
    if (!isUserExist) {
      console.log("token in handleLoginLocal", token);
      fetch("http://" + IP + ":" + PORT + "/users/" + email, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const user = data.result;
          console.log("fetched user", user);
          // !!!!!!!!!!
          if (user.plateNumber !== "" && user.plateNumber !== null) {
            addLocal({ email: user.email, isDriver: true });
          } else {
            addLocal({ email: user.email, isDriver: false });
          }
        })
        .catch((error) => {
          console.log("handleLoginLocal error");
        });
    }
  };
  const addLocal = async (user) => {
    await addUserLocal(user);
    await printUsersLocal();
  };

  const loginBackend = () => {
    const params = new URLSearchParams();
    params.append("grant_type", "");
    params.append("username", email);
    params.append("password", password);
    params.append("scope", "");
    params.append("client_id", "");
    params.append("client_secret", "");
    console.log(`http://${IP}:${PORT}/login`);
    fetch(`http://${IP}:${PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.detail) {
          if (data.detail.detail) setLoginResponse(data.detail.detail);
          else setLoginResponse("Field missing");
        } else {
          setLoginResponse("");
          AsyncStorage.setItem("currentUserEmail", email);
          login(data.access_token);
          handleLoginLocal(data.access_token);
          setEmail("");
          setPassword("");
          clearStackAndNavigate(navigation, "Main");
        }
      })
      .catch((error) => {
        console.log("loginBackend error", error);
      });
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  return (
    <ImageBackground
      source={require("../assets/loginNew.png")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Text style={styles.text}>Don't have an account ? Register as :</Text>
        <Text
          onPress={() => navigation.navigate("RegisterAsDriver")}
          style={styles.register}
        >
          Driver
        </Text>
        <Text
          onPress={() => navigation.navigate("RegisterPassenger")}
          style={styles.register}
        >
          Passenger
        </Text>
        <Button
          mode="contained"
          buttonColor="#7695F3"
          onPress={() => {
            loginBackend();
          }}
          style={styles.login_button}
        >
          <Text style={styles.login_text}>Login</Text>
        </Button>
        {!navigateNow && <Text style={styles.errorText}>{loginResponse}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  register: {
    color: "#6DACEF",
    fontWeight: "bold",
    marginTop: 3,
    display: "flex",
    alignSelf: "center",
    fontSize: 18,
  },
  text: {
    display: "flex",
    alignSelf: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  login_button: {
    width: 150,
    alignSelf: "center",
    marginTop: 14,
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    fontSize: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  login_text: {
    color: "#061848",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
});
