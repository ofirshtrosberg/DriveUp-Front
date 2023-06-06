import React, { useContext } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function FinishDriveScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/finishDrive.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate("TaxiPage");
          }}
        >
          <Text style={styles.text}>New Drive</Text>
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
    marginTop: 460,
    marginLeft: 160,
    width: 150,
    height: 60,
    borderRadius: 15,
    bottom: 50,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#061042",
  },
});
