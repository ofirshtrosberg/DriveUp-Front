import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import { Checkbox, Provider as PaperProvider } from "react-native-paper";
import { Button } from "react-native-paper";
import { AuthContext } from "../../AuthContext";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { requestDrives } from "../helperFunctions/accessToBackFunctions";
import theme from "../config/theme";
export default function DriverRoutesOffersPage() {
  const { userToken, login, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [currLat, setCurrLat] = useState(0);
  const [currLon, setCurrLon] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pickUpDistance, setPickUpDistance] = useState(0);
  const [rideDistance, setRideDistance] = useState(0);
  const navigation = useNavigation();
  const [useLimits, setUseLimits] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    setCurrLat(32.0672504);
    setCurrLon(34.7663349);
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
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <PaperProvider theme={theme}>
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
                  borderBottomColor: "#fff",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Text style={{ marginBottom: 2 }}>Order number:{key}</Text> */}
                  <Text style={{ marginBottom: 2, color: "#fff" }}>
                    Number of passengers:{data[key].totalVolume}
                  </Text>
                  <Text style={{ marginBottom: 2, color: "#fff" }}>
                    Estimated Profit:{data[key].totalValue}$
                  </Text>
                </View>
                <View>
                  <Button
                    mode="contained"
                    buttonColor="#6DD4F4"
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

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox.Android
                status={useLimits ? "checked" : "unchecked"}
                onPress={() => {
                  if (!useLimits) toggleModal();
                  setUseLimits(!useLimits);
                }}
                color="#fff"
              />
              <Text style={{ color: "#fff", fontSize: 16 }}>Use limits</Text>
            </View>
            <Modal isVisible={showModal} onBackdropPress={toggleModal}>
              <View style={{ flex: 1, backgroundColor: "#061848" }}>
                <Text>This is the modal content.</Text>
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => {
                fetchSuggestions();
              }}
              style={{
                width: 200,
                height: 50,
                alignSelf: "center",
                borderRadius: 20,
                overflow: "hidden",
                marginTop: 20,
              }}
            >
              <ImageBackground
                source={require("../assets/buttonBack.jpeg")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    lineHeight: 50,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Load drive suggestions
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061848",
  },
  watchDetailsBtn: {
    width: 150,
  },
  loadBtn: {
    marginTop: 15,
    marginHorizontal: 90,
  },
});
