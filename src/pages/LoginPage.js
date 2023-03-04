import React from "react";
import { Text, View } from "react-native";
import { TextInput } from "@react-native-material/core";
export default function LoginPage() {
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
    </View>
  );
}
