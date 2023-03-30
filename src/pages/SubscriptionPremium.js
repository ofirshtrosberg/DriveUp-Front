import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
export default function SubscriptionPremium() {
  return (
    <View style={styles.container}>
      <Text>Subscription</Text>
      <Text>Your current Subscription:</Text>
      <Text>Premium</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
