import React from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_API_KEY } from "@env";
import DriveMapPassengerMode from "../components/DriveMapPassengerMode";
export default function PassengerOrderResult() {
  return (
    <View style={styles.container}>
      //!!!! if ready load this:
      <DriveMap />
      //!!!! else load: waiting for drive
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
