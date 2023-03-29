import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function SubscriptionDriver() {
  return (
    <View style={styles.container}>
      <Text>SubscriptionDriver</Text>
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
