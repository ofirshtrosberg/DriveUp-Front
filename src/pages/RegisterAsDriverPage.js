import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
export default function RegisterAsDriverPage({ navigation }) {
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
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Phone Number"
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Full Name"
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Car Model"
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Car Color"
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Plate Number"
          style={{ marginBottom: 3, marginHorizontal: 20 }}
        />
        <Button
          mode="contained"
          buttonColor="#111"
          onPress={() => navigation.navigate("Login")}
          style={{ width: 150, alignSelf: "center", marginTop: 20 }}
        >
          Register
        </Button>
      </View>
    </ImageBackground>
  );
}
