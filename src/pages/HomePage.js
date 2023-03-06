import React from "react";
import {
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import { Header } from "@react-navigation/stack";
const ip = "10.100.102.101"; // wifi IPv4: find by using ipconfig on cmd (windows)
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const getUsers = () => {
  // fetch("http://" + ip + ":8000/users/")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  console.log("1");
};

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../Images/img3.jpg")}
        style={styles.image}
      ></Image>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>About us:</Text>
      </View>
      <Button
        onPress={getUsers}
        title="Learn More"
        color="black"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: screenHeight / 2,
    width: screenWidth,
  },
  paragraphContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
  },
});
