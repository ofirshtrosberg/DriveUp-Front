import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SubscriptionBasic from "./SubscriptionBasic";
import SubscriptionPremium from "./SubscriptionPremium";
const isBasic = true;
export default function SubscriptionPage() {
  return (
    <View style={styles.container}>
      {isBasic && <SubscriptionBasic></SubscriptionBasic>}
      {!isBasic && <SubscriptionPremium></SubscriptionPremium>}
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
