import React, { useState, useEffect } from "react";
import { URLSearchParams } from "react-native-url-polyfill";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors";
import { IP, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isUserExistLocal, addUserLocal } from "../../AsyncStorageUsers";
import { printUsersLocal } from "../../AsyncStorageUsers";
export default function LoginPage({ navigation }) {
  const [loginResponse, setLoginResponse] = useState("");
  const [navigateNow, setNavigateNow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("currentUserEmail").then((value) => {
      if (value !== null && value !== "") {
        navigation.navigate("Main");
      }
    });
  }, []);

  const handleLoginLocal = async () => {
    const isUserExist = await isUserExistLocal(email);
    console.log(isUserExist);
    if (!isUserExist) {
      fetch("http://" + IP + ":" + PORT + "/users/" + email)
        .then((response) => response.json())
        .then((data) => {
          const user = data.result;
          addLocal(user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const addLocal = async (user) => {
    await addUserLocal(user);
    await printUsersLocal();
  };
  async function login() {
    const params = new URLSearchParams();
    params.append("grant_type", "");
    params.append("username", email);
    params.append("password", password);
    params.append("scope", "");
    params.append("client_id", "");
    params.append("client_secret", "");

    fetch(`http://${IP}:${PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.detail) {
          setLoginResponse(data.detail.detail);
        } else {
          setLoginResponse("");
          handleLoginLocal();
          AsyncStorage.setItem("currentUserEmail", email);
          AsyncStorage.setItem("userToken", data.access_token).then(()=>{
             setEmail("");
             setPassword("");
             navigation.navigate("Main");
          });
         
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  return (
    <ImageBackground
      source={require("../assets/backgroundLogin.jpg")}
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
        <Text style={styles.text}>Don't have an account? Register as:</Text>
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
          buttonColor="#111"
          onPress={() => {
            login();
          }}
          style={styles.login_button}
        >
          Login
        </Button>
        {!navigateNow && <Text style={styles.errorText}>{loginResponse}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  register: {
    color: colors.blue2,
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
  },
  login_button: {
    width: 100,
    alignSelf: "center",
    marginTop: 14,
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.blue1,
  },
});
