import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { AuthContext } from "../../AuthContext";
import { getDriveByOrderId } from "../helperFunctions/accessToBackFunctions";
import DriveMapPassengerMode from "../components/DriveMapPassengerMode";
import { useRoute } from "@react-navigation/native";
export default function PassengerOrderResult() {
  const route = useRoute();
  const { orderId } = route.params;
  const { userToken, login, logout } = useContext(AuthContext);
  const [driveId, setDriveId] = useState(0);
  useEffect(() => {
    getDriveByOrderId(orderId, userToken);
  }, []);
  return (
    <View style={styles.container}>
      <DriveMapPassengerMode />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
