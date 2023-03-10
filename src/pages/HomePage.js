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
import colors from "../config/colors";
import { useEffect } from "react";
import { Header } from "@react-navigation/stack";
const ip = "10.100.102.101"; // wifi IPv4: find by using ipconfig on cmd (windows)
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";
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
    <View style={styles.pageContainer}>
      <Image style={styles.img} source={require("../assets/img1.png")}></Image>
      <View style={styles.bottomContainer}>
        <Button title="Click" color={colors.primary} style={styles.btn}></Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  btn: {
    width: 40,
  },
});
