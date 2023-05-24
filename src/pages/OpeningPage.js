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
  },
  text: {
    fontSize: 35,
    lineHeight: 65,
    textAlign: "center",
    fontWeight: "bold",
  },
});
