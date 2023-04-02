import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Button } from "react-native-paper";
export default function SubscriptionPremium() {
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
      <Text style={styles.subscription}>Premium</Text>
      <Button
        style={styles.subscriptionBtn}
        mode="contained"
        buttonColor="#111"
      >
        Cancel subscription
      </Button>
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
  text: {
    fontSize: 19,
  },
  subscription: {
    marginTop: 4,
    fontFamily: "Lobster_400Regular",
    fontSize: 30,
    fontWeight: "normal",
  },
  subscriptionBtn: {
    marginTop: 20,
  },
});
