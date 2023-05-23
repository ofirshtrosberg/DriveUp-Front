import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../AuthContext";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestDrives } from "../helperFunctions/accessToBackFunctions";

export default function DriverRoutesOffersPage() {
  const { userToken, login, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [currLat, setCurrLat] = useState(0);
  const [currLon, setCurrLon] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchSuggestions();
    setIsLoading(false);
  }, []);
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
  useEffect(() => {
    console.log(data);
  }, [data]);
  const fetchSuggestions = async () => {
    try {
      await updateCurrentLocation();
      const response = await requestDrives(userToken, currLat, currLon);
      console.log(response);
      setData(response.solutions);
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
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
