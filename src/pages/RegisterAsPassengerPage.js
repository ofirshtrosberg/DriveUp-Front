import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateFullName,
} from "../helperFunctions/validationFunctions.js";
import { IP, PORT } from "@env";
import { addUserLocal, printUsersLocal } from "../../AsyncStorageUsers";
export default function RegisterAsDriverPage({ navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const handleRegister = (
    email,
    password,
    phone,
    fullName,
    carModel,
    carColor,
    plateNumber
  ) => {
    fetch("http://" + IP + ":" + PORT + "/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          email: email,
          password: password,
          phone_number: phone,
          full_name: fullName,
          car_model: carModel,
          car_color: carColor,
          plate_number: plateNumber,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        response.json();
      })
      .then((data) => {
        handleRegisterLocal(
          email,
          password,
          phone,
          fullName,
          carModel,
          carColor,
          plateNumber
        );
      })
      .catch((error) => {
        setErrorMessage("Registration failed!");
      });
  };
  const handleRegisterLocal = async (
    email,
    password,
    phone,
    fullName,
    carModel,
    carColor,
    plateNumber
  ) => {
    const user = {
      email: email,
      password: password,
      phone_number: phone,
      full_name: fullName,
      car_model: carModel,
      car_color: carColor,
      plate_number: plateNumber,
      image_url: "",
    };
    await addUserLocal(user);
    await printUsersLocal();
    navigation.navigate("Login");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handlePhoneChange = (text) => {
    setPhone(text);
  };
  const handleFullNameChange = (text) => {
    setFullName(text);
  };

  return (
    <ImageBackground
      source={require("../assets/register.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, marginBottom: 3 }}></View>
      <View style={{ flex: 3 }}>
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
        <TextInput
          mode="outlined"
          label="Phone Number"
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
        />
        <TextInput
          mode="outlined"
          label="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={handleFullNameChange}
        />

        <Button
          mode="contained"
          buttonColor="#111"
          onPress={() => {
            if (!validateEmail(email)) {
              setErrorMessage("Invalid email");
            } else if (!validatePassword(password)) {
              setErrorMessage("Invalid password");
            } else if (!validatePhoneNumber(phone)) {
              setErrorMessage("Invalid phone number");
            } else if (!validateFullName(fullName)) {
              setErrorMessage("Invalid full name");
            } else {
              setErrorMessage("");
              handleRegister(
                email.trim(),
                password.trim(),
                phone.trim(),
                fullName.trim(),
                "",
                "",
                ""
              );
            }
          }}
          style={styles.register_button}
        >
          Register
        </Button>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  input: {
    marginBottom: 3,
    marginHorizontal: 20,
  },
  register_button: {
    width: 150,
    alignSelf: "center",
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.blue1,
  },
});
