import React, { useState } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors";
import { ip } from "../helperFunctions/accessToBackFunctions";
// import { setCurrentEmail } from "../../CurrentConnectedUserDetails";
export default function LoginPage({ navigation }) {
  const ip = "10.0.0.43";
  const [loginResponse, setLoginResponse] = useState("");
  const [navigateNow, setNavigateNow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    fetch("http://" + ip + ":8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginResponse(data.detail);
        if (data.message === "User logged in successfully")
          // setCurrentEmail(email);
          navigation.navigate("Main");
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
