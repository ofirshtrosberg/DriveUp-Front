import React from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Button } from "react-native-paper";
import colors from "../config/colors";
import GlobalVar from "../../global";

export default function LoginPage({ navigation }) {
  // console.log(GlobalVar.isLoggedIn);
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
      <Text>Don't have an account? </Text>
      <Text
        onPress={() => navigation.navigate("Register")}
        style={styles.register}
      >
        Register now
      </Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        click
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    color: colors.blue2,
  },
});
