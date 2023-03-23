import React, { useState } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { addUser } from "../helperFunctions/accessToBackFunctions.js";

export default function RegisterAsDriverPage({ navigation }) {
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
    <ImageBackground
      source={require("../assets/register.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, marginBottom: 3 }}>
        {/* <View style={{ flex: 1 }}></View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            width: "35%",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <Button
            mode="contained"
            buttonColor="#111"
            style={{ width: 120, alignSelf: "center", marginTop: 20 }}
          >
            Add Image
          </Button>
        </View> */}
      </View>
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
          buttonColor="#111"
          onPress={() => {
            addUser(
              email,
              password,
              phone,
              fullName,
              carModel,
              carColor,
              plateNumber
            );
            navigation.navigate("Login");
          }}
          style={styles.register_button}
        >
          Register
        </Button>
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
    marginTop: 20,
  },
});
