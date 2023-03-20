import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
const ip = "10.100.102.101";
const addUser = () => {
  fetch("http://" + ip + ":8000/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        email: "ofir@gmail.com",
        password: "11",
        phone_number: "05487877",
        full_name: "ofi",
        car_model: "mazdaa",
        car_color: "blueqq",
        plate_number: "00000000000",
      },
    }),
  });
};

const deleteUser = () => {
  const email = "";

  fetch("http://" + ip + ":8000/users/" + email, {
    method: "DELETE",
  }).catch((error) => {
    console.error(error);
  });
};

const getUserByEmail = () => {
  const email = "ofir@gmail.com";
  fetch("http://" + ip + ":8000/users/" + email)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};
const updateUser = () => {
  const email = "ofir@gmail.com";

  fetch("http://" + ip + ":8000/users/" + email, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        // password not working, phone also
        full_name: "ggg",
        plate_number: "ggg",
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data updated:", data);
    })
    .catch((error) => {
      console.error(error);
    });
};
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
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{ width: 150, alignSelf: "center", marginTop: 20 }}
        >
          Register
        </Button>
      </View>
    </ImageBackground>
  );
}
