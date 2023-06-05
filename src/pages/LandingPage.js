import React from "react";
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

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/landingPage.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.text}>Get Started</Text>
        </Button>
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
    marginRight:250,
    width: 200,
    height: 50,
    borderRadius: 5,
    bottom: 50,
  },
  text: {
    fontSize: 20,
    marginTop: 100,
    textAlign: "center",
    fontWeight: "bold",
    color: "#061042",
  },
});
