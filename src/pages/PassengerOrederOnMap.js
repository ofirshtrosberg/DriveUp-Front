import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
export default function PassengerOrderOnMap() {
  return (
    <View style={styles.container}>
      <Text>Order on map</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
