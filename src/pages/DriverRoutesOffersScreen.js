import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../AuthContext";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestDrives } from "../helperFunctions/accessToBackFunctions";
// const data = [
//   { orderNumber: "12345", numberOfPassengers: 3, estimatedProfit: 35 },
//   { orderNumber: "12346", numberOfPassengers: 4, estimatedProfit: 36 },
//   { orderNumber: "12347", numberOfPassengers: 5, estimatedProfit: 40 },
// ];
export default function DriverRoutesOffersPage() {
  const { userToken, login, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [currLat, setCurrLat] = useState(0);
  const [currLon, setCurrLon] = useState(0);
  const updateCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let lon = location.coords.longitude;
    let lat = location.coords.latitude;
    setCurrLat(lat);
    setCurrLon(lon);
  };
  useEffect(() => {
    console.log(currLat);
  }, [currLat]);
  useEffect(() => {
    console.log(currLon);
  }, [currLon]);
  const fetchSuggestions = async () => {
    try {
      await updateCurrentLocation();
      const value = await AsyncStorage.getItem("currentUserEmail");
      if (value !== null && value !== "") {
        const response = await requestDrives(
          userToken,
          value,
          currLat,
          currLon
        );
        console.log("fetchSuggestions", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* {data.map((item) => (
        <View
          key={item.orderNumber}
          style={{
            borderBottomWidth: 1,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text style={{ marginBottom: 2 }}>
              Order number:{item.orderNumber}
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Number of passengers:{item.numberOfPassengers}
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Estimated Profit:{item.estimatedProfit}$
            </Text>
          </View>
          <View>
            <Button
              mode="contained"
              buttonColor="#111"
              style={styles.watchDetailsBtn}
              onPress={() => {
                navigation.navigate("DriveDriverMode");
              }}
            >
              Watch details
            </Button>
          </View>
        </View>
      ))} */}
      <Button
        mode="contained"
        buttonColor="#111"
        onPress={() => {
          fetchSuggestions();
        }}
      >
        Load drive suggestions
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watchDetailsBtn: {
    width: 150,
  },
});
