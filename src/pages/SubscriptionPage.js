import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SubscriptionDriver from "./SubscriptionDriver";
import SubscriptionPassenger from "./SubscriptionPassenger";
const isDriver = false;
export default function SubscriptionPage() {
  return (
    <View style={styles.container}>
      {isDriver && <SubscriptionDriver></SubscriptionDriver>}
      {!isDriver && <SubscriptionPassenger></SubscriptionPassenger>}
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
