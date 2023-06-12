import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { printUsersLocal, deleteUserLocal } from "../../AsyncStorageUsers";
export default function LandingPage() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/landing2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.getItem("userToken").then((value) => {
              if (value !== null && value !== "") {
                login(value);
                navigation.navigate("Main");
              } else {
                navigation.navigate("Login");
              }
            });
          }}
          style={{
            width: 200,
            height: 50,
            borderRadius: 20,
            overflow: "hidden",
            position:"absolute",
            bottom:30,
            left:20,
          }}
        >
          <ImageBackground
            source={require("../assets/btnOrder.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                lineHeight: 50,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Get Started
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 610,
    marginLeft: 30,
    width: 145,
    height: 50,
    borderRadius: 15,
    bottom: 50,
  },
  text: {
    fontSize: 20,
    marginTop: 100,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
