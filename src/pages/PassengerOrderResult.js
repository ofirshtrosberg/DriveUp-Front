import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../../AuthContext";
import { getDriveByOrderId } from "../helperFunctions/accessToBackFunctions";
import DriveMapPassengerMode from "../components/DriveMapPassengerMode";
import { useRoute } from "@react-navigation/native";
export default function PassengerOrderResult() {
  const route = useRoute();
  const { orderId } = route.params;
  const { userToken, login, logout } = useContext(AuthContext);
  const [driveId, setDriveId] = useState("ggdgdfgrehdhdh");
  const checkDrive = async () => {
    try {
      const response = await getDriveByOrderId(orderId, userToken);
      console.log("drive id", response);
      setDriveId(response);
    } catch (error) {
      console.log("checkDrive ", error);
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
        <DriveMapPassengerMode driveId={driveId} />
      ) : (
        <ImageBackground
          source={require("../assets/backgroundDriveup.png")}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 30 }}>
              Finding you a drive
            </Text>
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{marginTop:10}}
            />
          </View>
        </ImageBackground>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
