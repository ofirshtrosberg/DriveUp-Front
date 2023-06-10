import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function FinishDriveScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/finish.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TaxiPage");
          }}
          style={{
            width: 200,
            height: 50,
            borderRadius: 20,
            overflow: "hidden",
            position: "absolute",
            bottom: 100,
            alignSelf:"center"
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
              New Drive
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        {/* <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate("TaxiPage");
          }}
        >
          <Text style={styles.text}>New Drive</Text>
        </Button> */}
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
    alignSelf: "center",
    marginTop: 460,
    width: 150,
    height: 60,
    borderRadius: 15,
    bottom: 50,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
