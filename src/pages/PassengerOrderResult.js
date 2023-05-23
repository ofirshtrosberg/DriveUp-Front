import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../AuthContext";
import { getDriveByOrderId } from "../helperFunctions/accessToBackFunctions";
import DriveMapPassengerMode from "../components/DriveMapPassengerMode";
import { useRoute } from "@react-navigation/native";
export default function PassengerOrderResult() {
  const route = useRoute();
  const { orderId } = route.params;
  const { userToken, login, logout } = useContext(AuthContext);
  const [driveId, setDriveId] = useState(null);
  const checkDrive = async () => {
    try {
      const response = await getDriveByOrderId(orderId, userToken);
      console.log("drive id", response);
      setDriveId(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval;

    const checkDriveWithInterval = async () => {
      if (driveId === null) {
        await checkDrive();
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(checkDriveWithInterval, 5000);
    checkDriveWithInterval();

    return () => clearInterval(interval);
  }, [driveId]);
  return (
    <View style={styles.container}>
      {driveId !== null ? (
        <DriveMapPassengerMode />
      ) : (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Finding you a drive</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
