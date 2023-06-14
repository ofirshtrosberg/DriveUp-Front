import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { Checkbox, Provider as PaperProvider } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../AuthContext";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import {
  requestDrives,
  rejectDrives,
} from "../helperFunctions/accessToBackFunctions";
import theme from "../config/theme";
import { TextInput, Button } from "react-native-paper";
export default function DriverRoutesOffersPage() {
  const { userToken, login, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [currLat, setCurrLat] = useState(0);
  const [currLon, setCurrLon] = useState(0);
  const [pickUpDistance, setPickUpDistance] = useState("100");
  const [rideDistance, setRideDistance] = useState("100");
  const navigation = useNavigation();
  const [useLimits, setUseLimits] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [limits, setLimits] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      fetchSuggestions();
      return () => {};
    }, [])
  );
  useEffect(() => {
    console.log("curr lat:", currLat);
  }, [currLat]);
  useEffect(() => {
    console.log("curr lon:", currLon);
  }, [currLon]);
  useEffect(() => {
    console.log("data changed:", data);
  }, [data]);
  useEffect(() => {
    console.log("is loading changed", isLoading);
  }, [isLoading]);
  const rejectAndLoadOffers = async () => {
    setIsLoading(true);
    try {
      setErrorMessage("");
      const response = await rejectDrives(userToken, navigation, logout);
      if (response === true) {
        await fetchSuggestions();
      } else {
        setErrorMessage("Action failed");
      }
    } catch (error) {
      console.log("rejectAndLoadOffers error");
    } finally {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  };
  const updateCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let lon = location.coords.longitude;
      let lat = location.coords.latitude;
      return { lat, lon };
    } catch (error) {
      console.log("updateCurrentLocation");
    }
  };
  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      setErrorMessage("");
      // const res = await updateCurrentLocation();
      // const response = await requestDrives(
      //   userToken,
      //   res.lat,
      //   res.lon,
      //   limits,
      //   navigation,
      //   logout
      // );

      // for 20/6:
      const response = await requestDrives(
        userToken,
        31.968773,
        34.770963,
        limits,
        navigation,
        logout
      );
      setData(response.solutions);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Load failed");
      console.log("error fetchSuggestions");
    } finally {
      setIsLoading(false);
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handlePickUpDistanceChange = (text) => {
    setPickUpDistance(parseInt(text));
  };
  const handleRideDistanceChange = (text) => {
    setRideDistance(parseInt(text));
  };
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {data === null || data === undefined ? (
          <View>
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
              <ImageBackground
                source={require("../assets/limitsBack.png")}
                style={{ flex: 1 }}
              >
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 3 }}>
                  <TextInput
                    mode="outlined"
                    label="Pickup Distance"
                    style={styles.input}
                    value={pickUpDistance.toString()}
                    keyboardType="numeric"
                    onChangeText={handlePickUpDistanceChange}
                  />
                  <TextInput
                    mode="outlined"
                    label="Ride Distance"
                    style={styles.input}
                    value={rideDistance.toString()}
                    keyboardType="numeric"
                    onChangeText={handleRideDistanceChange}
                  />
                  <Button
                    mode="contained"
                    buttonColor="#111"
                    onPress={() => {
                      setLimits({
                        pick_up_distance: {
                          min: 0,
                          max: parseInt(pickUpDistance),
                        },
                        ride_distance: { min: 0, max: parseInt(rideDistance) },
                      });
                      setShowModal(false);
                    }}
                    style={styles.save_button}
                  >
                    Save
                  </Button>
                </View>
              </ImageBackground>
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
                source={require("../assets/btnOrder.png")}
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
            <Text
              style={{
                marginTop: 10,
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </Text>
          </View>
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
                    buttonColor="#76A6ED"
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
              <ImageBackground
                source={require("../assets/limitsBack.png")}
                style={{ flex: 1 }}
              >
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 3 }}>
                  <TextInput
                    mode="outlined"
                    label="Pickup Distance"
                    style={styles.input}
                    value={pickUpDistance.toString()}
                    keyboardType="numeric"
                    onChangeText={handlePickUpDistanceChange}
                  />
                  <TextInput
                    mode="outlined"
                    label="Ride Distance"
                    style={styles.input}
                    value={rideDistance.toString()}
                    keyboardType="numeric"
                    onChangeText={handleRideDistanceChange}
                  />
                  <Button
                    mode="contained"
                    buttonColor="#111"
                    onPress={() => {
                      setLimits({
                        pick_up_distance: {
                          min: 0,
                          max: parseInt(pickUpDistance),
                        },
                        ride_distance: { min: 0, max: parseInt(rideDistance) },
                      });
                      setShowModal(false);
                    }}
                    style={styles.save_button}
                  >
                    Save
                  </Button>
                </View>
              </ImageBackground>
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
                source={require("../assets/btnOrder.png")}
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
            <TouchableOpacity
              onPress={() => {
                setIsLoading(true);
                rejectAndLoadOffers();
                setIsLoading(false);
              }}
              style={{
                width: 200,
                height: 50,
                alignSelf: "center",
                borderRadius: 20,
                overflow: "hidden",
                marginTop: 10,
              }}
            >
              <ImageBackground
                source={require("../assets/btnOrder.png")}
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
                  Reject & Load suggestions
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </Text>
          </View>
        )}
        {isLoading && <ActivityIndicator size="large" color="#76A6ED" />}
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
  input: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  save_button: {
    width: 100,
    alignSelf: "center",
    marginTop: 14,
  },
});
