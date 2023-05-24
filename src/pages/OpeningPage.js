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

export default function HomePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/open.png")}
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
    backgroundColor: "#BCBEFA",
    marginTop: 450,
    width: 400,
    height: 50,
    borderRadius: 5,
    bottom: 50,
  },
  text: {
    fontSize: 20,
    // lineHeight: 50,
    marginTop: 100,
    textAlign: "center",
    fontWeight: "bold",
    color: "#191774",
  },
});
