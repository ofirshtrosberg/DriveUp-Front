import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../AuthContext";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { requestDrives } from "../helperFunctions/accessToBackFunctions";

export default function DriverRoutesOffersPage() {
  const { userToken, login, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [currLat, setCurrLat] = useState(0);
  const [currLon, setCurrLon] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pickUpDistance, setPickUpDistance] = useState(0);
  const [rideDistance, setRideDistance] = useState(0);
  const navigation = useNavigation();
  const handleChangePickUpDistance = (value) => {
    setPickUpDistance(value);
  };
  const handleChangeRideDistance = (value) => {
    setRideDistance(value);
  };
  useEffect(() => {
    fetchSuggestions();
  }, []);
  const updateCurrentLocation = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   console.log("Permission to access location was denied");
    //   return;
    // }
    // let location = await Location.getCurrentPositionAsync({});
    // let lon = location.coords.longitude;
    // let lat = location.coords.latitude;
    // setCurrLat(lat);
    // setCurrLon(lon);
    console.log("hjvbhj");
    setCurrLat(32.0880503);
    setCurrLon(34.7148435);
  };
  useEffect(() => {
    console.log(currLat);
  }, [currLat]);
  useEffect(() => {
    console.log(currLon);
  }, [currLon]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const fetchSuggestions = async () => {
    try {
      console.log("jfjf");
      await updateCurrentLocation();
      console.log("@@@@@");
      const response = await requestDrives(
        userToken,
        currLat,
        currLon,
        navigation
      );
      console.log(response);
      setData(response.solutions);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {data === null ? (
        <Button
          mode="contained"
          buttonColor="#111"
          style={styles.loadBtn}
          onPress={() => {
            fetchSuggestions();
          }}
        >
          Load drive suggestions
        </Button>
      ) : (
        <View>
          {Object.keys(data).map((key) => (
            <View
              key={key}
              style={{
                borderBottomWidth: 1,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                {/* <Text style={{ marginBottom: 2 }}>Order number:{key}</Text> */}
                <Text style={{ marginBottom: 2 }}>
                  Number of passengers:{data[key].totalVolume}
                </Text>
                <Text style={{ marginBottom: 2 }}>
                  Estimated Profit:{data[key].totalValue}$
                </Text>
              </View>
              <View>
                <Button
                  mode="contained"
                  buttonColor="#111"
                  style={styles.watchDetailsBtn}
                  onPress={() => {
                    navigation.navigate("DriveDriverMode", { driveId: key });
                  }}
                >
                  Watch details
                </Button>
              </View>
            </View>
          ))}
          <Button
            mode="contained"
            buttonColor="#111"
            style={styles.loadBtn}
            onPress={() => {
              fetchSuggestions();
            }}
          >
            Load drive suggestions
          </Button>
          <Slider
            style={{
              width: 200,
              height: 40,
              marginTop: 30,
              alignSelf: "center",
            }}
            minimumValue={0}
            maximumValue={100}
            value={pickUpDistance}
            onValueChange={handleChangePickUpDistance}
            minimumTrackTintColor="#6CFDFA"
            maximumTrackTintColor="#000000"
            thumbTintColor="#40FCFB"
          />
          <Text>PickUpDistance: {pickUpDistance}</Text>
          <Slider
            style={{
              width: 200,
              height: 40,
              marginTop: 30,
              alignSelf: "center",
            }}
            minimumValue={0}
            maximumValue={100}
            value={rideDistance}
            onValueChange={handleChangeRideDistance}
            minimumTrackTintColor="#6CFDFA"
            maximumTrackTintColor="#000000"
            thumbTintColor="#40FCFB"
          />
          <Text>RideDistance: {rideDistance}</Text>
        </View>
      )}
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
  loadBtn: {
    marginTop: 15,
    marginHorizontal: 90,
  },
});
