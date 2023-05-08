import React from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_API_KEY } from "@env";
export default function PassengerOrderResult() {
  return (
    <View style={styles.container}>
      <Text>Driver is on the way</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
