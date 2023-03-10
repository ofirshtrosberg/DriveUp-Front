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
        <Text style={styles.title}>DriveUP</Text>
        <View style={styles.aboutContainer}>
          <Text numberOfLines={10}>
            About Us:{"\n\n"}DriveUp is a mobile app for ride sharing.{"\n"}
            On our app you can......
          </Text>
        </View>
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
    backgroundColor: colors.blue2,
  },
  title: {
    textAlign: "center",
    color: colors.blue3,
    fontSize: 30,
    backgroundColor: colors.blue1,
    width: "100%",
  },
  aboutContainer: {
    backgroundColor: colors.blue4,
    width: "80%",
    height: "80%",
    alignSelf: "center",
    top: 25,
    padding: 20,
  },
});
