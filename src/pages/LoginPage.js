import React, { useState } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

import colors from "../config/colors";

export default function LoginPage({ navigation }) {
  const [focus, setFocus] = useState(false);
  const inputStyle = focus ? styles.inputFocus : styles.input;
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
          style={{ marginBottom: 7, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          style={{ marginBottom: 7, marginHorizontal: 20 }}
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
          onPress={() => navigation.navigate("Main")}
          style={{ width: 100, alignSelf: "center", marginTop: 25 }}
        >
          Login
        </Button>
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
});
