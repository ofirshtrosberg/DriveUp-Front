import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors";
const windowWidth = Dimensions.get("window").width;
export default function SubscriptionBasic() {
  const [error, estError] = useState("");
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.text}>Your current Subscription:</Text>
      <Text style={styles.subscription}>Basic</Text>
      <TextInput mode="outlined" label="Card owner id" style={styles.input} />
      <TextInput mode="outlined" label="Card number" style={styles.input} />
      <TextInput mode="outlined" label="CVV" style={styles.input} />
      <TextInput mode="outlined" label="Expiration date" style={styles.input} />
      <Button style={styles.upgradeBtn} mode="contained" buttonColor="#111">
        Upgrade to premium
      </Button>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Lobster_400Regular",
    fontSize: 50,
    fontWeight: "normal",
  },
  text:{
    fontSize: 19,
  },
  subscription: {
    marginTop:4,
    fontFamily: "Lobster_400Regular",
    fontSize: 30,
    fontWeight: "normal",
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    width: (4 / 5) * windowWidth,
  },
  upgradeBtn: {
    marginTop: 20,
    // width: (2 / 3) * windowWidth,
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.blue1,
  },
});
