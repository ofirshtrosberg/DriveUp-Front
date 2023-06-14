import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../../AuthContext";
import {
  getDriveByOrderId,
  cancelOrder,
} from "../helperFunctions/accessToBackFunctions";
import DriveMapPassengerMode from "./DriveMapPassengerMode";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
export default function PassengerOrderResult() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const { userToken, login, logout } = useContext(AuthContext);
  const [driveId, setDriveId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const checkDrive = async () => {
    try {
      const response = await getDriveByOrderId(
        orderId,
        userToken,
        navigation,
        logout
      );
      setDriveId(response);
    } catch (error) {
      console.log("checkDrive error");
    }
  };
  const cancelOrderCheck = async () => {
    try {
      const response = await cancelOrder(
        orderId,
        userToken,
        navigation,
        logout
      );
      if (response === false) {
        setErrorMessage("Cancel order failed!");
      }
    } catch (error) {
      setErrorMessage("Cancel order failed!");
    }
  };
  useEffect(() => {
    let interval;

    const checkDriveWithInterval = async () => {
      if (driveId === null || driveId === "") {
        await checkDrive();
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(checkDriveWithInterval, 2000);
    checkDriveWithInterval();

    return () => clearInterval(interval);
  }, [driveId]);
  return (
    <View style={styles.container}>
      {driveId !== null && driveId !== "" ? (
        <DriveMapPassengerMode driveId={driveId} orderId={orderId} />
      ) : (
        <ImageBackground
          source={require("../assets/orderBackNew2.png")}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 30 }}>
              Finding you a drive
            </Text>
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 10 }}
            />
          </View>
          <Button
            mode="contained"
            buttonColor="#7B96F0"
            style={{ marginHorizontal: 70, marginTop: 20 }}
            onPress={() => {
              cancelOrderCheck();
            }}
          >
            Cancel Order
          </Button>
          <Text style={{ marginTop: 10, color: "#fff" }}>{errorMessage}</Text>
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
