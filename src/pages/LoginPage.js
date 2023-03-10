import React from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Button } from "react-native-paper";
export default function LoginPage({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <TextInput
        variant="outlined"
        label="Email"
        style={{
          width: 300,
        }}
      />
      <TextInput
        variant="outlined"
        label="Password"
        style={{
          width: 300,
        }}
      />
      <Text onPress={() => navigation.navigate("Register")}>Sign up</Text>
    </View>
  );
}
