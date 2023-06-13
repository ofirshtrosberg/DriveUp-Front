import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { IP, PORT } from "@env";
import colors from "../config/colors.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateFullName,
  validateCarModel,
  validateCarColor,
  validatePlateNumber,
} from "../helperFunctions/validationFunctions.js";
import {
  addUserLocal,
  printUsersLocal,
  deleteUserLocal,
} from "../../AsyncStorageUsers";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterAsDriverPage({ navigation }) {
  // printUsersLocal();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Driver Register",
    });
  }, [navigation]);
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
        if (response.status === 400) {
          setErrorMessage("Email/phone number is already exist");
          throw new Error("Email/phone number is already exist");
        }
        if (!response.ok) {
          setErrorMessage("Registration failed");
          throw new Error("Registration failed");
        }
        response.json();
      })
      .then((data) => {
        handleRegisterLocal(email, true);
      })
      .catch((error) => {});
  };
  const handleRegisterLocal = async (email, isDriver) => {
    const user = {
      email: email,
      isDriver: isDriver,
    };
    await addUserLocal(user);
    await printUsersLocal();
    navigation.navigate("Login");
    console.log("User added successfully!");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
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
  const handleCarModelChange = (text) => {
    setCarModel(text);
  };
  const handleCarColorChange = (text) => {
    setCarColor(text);
  };
  const handlePlateNumberChange = (text) => {
    setPlateNumber(text);
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={220}
    >
      <ImageBackground
        source={require("../assets/register.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.data}>
          <TextInput
            mode="outlined"
            label="Email"
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            // keyboardType="email-address"
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
            keyboardType="phone-pad"
          />
          <TextInput
            mode="outlined"
            label="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={handleFullNameChange}
          />
          <TextInput
            mode="outlined"
            label="Car Model"
            style={styles.input}
            value={carModel}
            onChangeText={handleCarModelChange}
          />
          <TextInput
            mode="outlined"
            label="Car Color"
            style={styles.input}
            value={carColor}
            onChangeText={handleCarColorChange}
          />
          <TextInput
            mode="outlined"
            label="Plate Number"
            style={styles.input}
            value={plateNumber}
            onChangeText={handlePlateNumberChange}
          />
          <Button
            mode="contained"
            buttonColor="#76A6ED"
            onPress={() => {
              if (!validateEmail(email)) {
                setErrorMessage("Invalid email");
              } else if (!validatePassword(password)) {
                setErrorMessage("Invalid password");
              } else if (!validatePhoneNumber(phone)) {
                setErrorMessage("Invalid phone number");
              } else if (!validateFullName(fullName)) {
                setErrorMessage("Invalid full name");
              } else if (!validateCarModel(carModel)) {
                setErrorMessage("Invalid car model");
              } else if (!validateCarColor(carColor)) {
                setErrorMessage("Invalid car color");
              } else if (!validatePlateNumber(plateNumber)) {
                setErrorMessage("Invalid plate number");
              } else {
                setErrorMessage("");
                handleRegister(
                  email.trim(),
                  password.trim(),
                  phone.trim(),
                  fullName.trim(),
                  carModel.trim(),
                  carColor.trim(),
                  plateNumber.trim()
                );
              }
            }}
            style={styles.register_button}
          >
            <Text style={styles.registerText}>Register now</Text>
          </Button>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    // flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
  },
  // image: {
  //   flex: 1,
  // justifyContent: "center",
  //
  // },
  input: {
    marginBottom: 3,
    marginHorizontal: 20,
    fontSize: 19.5,
  },
  register_button: {
    width: 200,
    alignSelf: "center",
    marginTop: 15,
  },
  error: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  data: { marginTop: 100 },
  registerText: { color: "white", fontSize: 21, textAlign: "center" },
});
