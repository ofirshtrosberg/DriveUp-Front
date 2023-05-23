import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { useState } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { passengerOrderDrive } from "../helperFunctions/accessToBackFunctions";
import { useNavigation } from "@react-navigation/core";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
import PassengerOrderOnMap from "./PassengerOrderOnMap";
export default function PassengerOrderTaxiPage({ currentUserEmail }) {
  const { userToken, login, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [startAddress, setStartAddress] = useState("");
  const [currAddress, setCurrAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isGeocodingFine, setIsGeocodingFine] = useState(false);
  const [startLat, setStartLat] = useState(0);
  const [destinationLat, setDestinationLat] = useState(0);
  const [startLon, setStartLon] = useState(0);
  const [destinationLon, setDestinationLon] = useState(0);

  const toggleModal = () => {
    setShowErrorMessage(false);
    setIsModalVisible(!isModalVisible);
  };
  const updateCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let lon = location.coords.longitude;
    let lat = location.coords.latitude;
    // Reverse geocoding
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setCurrAddress(data.results[0].formatted_address);
        } else {
          console.log("Geocoding failed:", data.status);
        }
      })
      .catch((error) => {
        console.log("Geocoding error:", error);
      });
  };
  const handleAddOrder = async (startLocation, destinationLocation) => {
    try {
      const responseStart = await Geocoder.from(startLocation);
      const responseDest = await Geocoder.from(destinationLocation);
      const response = await passengerOrderDrive(
        currentUserEmail,
        responseStart.results[0].geometry.location.lat,
        responseStart.results[0].geometry.location.lng,
        responseDest.results[0].geometry.location.lat,
        responseDest.results[0].geometry.location.lng,
        numberOfPassengers,
        userToken
      );
      setErrorMessage("");
      setShowErrorMessage(false);
      navigation.navigate("OrderResult", { orderId: response });
    } catch (error) {
      console.log(error);
      setErrorMessage("Order Failed");
      setShowErrorMessage(true);
    }
  };
  const checkIfLocationsAreFine = async (
    startLocation,
    destinationLocation
  ) => {
    try {
      const responseStart = await Geocoder.from(startLocation);
      const responseDest = await Geocoder.from(destinationLocation);
      setStartLat(responseStart.results[0].geometry.location.lat);
      setStartLon(responseStart.results[0].geometry.location.lng);
      setDestinationLat(responseDest.results[0].geometry.location.lat);
      setDestinationLon(responseDest.results[0].geometry.location.lng);
      setIsGeocodingFine(true);
    } catch (error) {
      setIsGeocodingFine(false);
    }
  };
  useEffect(() => {
    console.log(startLat);
  }, [startLat]);
  useEffect(() => {
    console.log(startLon);
  }, [startLon]);
  useEffect(() => {
    console.log(destinationLat);
  }, [destinationLat]);
  useEffect(() => {
    console.log(destinationLon);
  }, [destinationLon]);
  useEffect(() => {
    console.log("start change", startLat, startLon);
  }, [startAddress]);
  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);
    updateCurrentLocation();
  }, []);
  const handleDestinationAddressChange = (text) => {
    setDestinationAddress(text);
  };
  const handleStartAddressChange = (text) => {
    setStartAddress(text);
    if (checked) {
      setChecked(!checked);
    }
  };
  const handleNumberOfPassengersChange = (text) => {
    setNumberOfPassengers(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Start Address"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setStartAddress(data.description);
          }}
          textInputProps={{
            onChangeText: handleStartAddressChange,
            value: startAddress,
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              position: "absolute",
              top: 10,
              left: 0,
              right: 0,
              zIndex: 9999,
            },
            listView: {
              zIndex: 10000,
            },
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Destination Address"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setDestinationAddress(data.description);
          }}
          textInputProps={{
            onChangeText: handleDestinationAddressChange,
            value: destinationAddress,
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              position: "absolute",
              top: 70,
              left: 0,
              right: 0,
              zIndex: 9997,
            },
            listView: {
              zIndex: 9998,
            },
          }}
        />
        <TextInput
          value={numberOfPassengers}
          keyboardType="numeric"
          maxLength={2}
          style={{
            backgroundColor: "#fff",
            height: 50,
            zIndex: 100,
            position: "absolute",
            top: 130,
            left: 0,
            right: 0,
          }}
          onChangeText={handleNumberOfPassengersChange}
          placeholder="Number of passengers"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 240,
            left: 0,
            right: 0,
          }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              if (!checked) {
                setStartAddress(currAddress);
              } else {
                setStartAddress("");
              }
              setChecked(!checked);
            }}
          />
          <Text>Use current location as start address</Text>
        </View>
      </View>
      <View
        style={{ flex: 1, position: "absolute", top: 400, left: 0, right: 0 }}
      >
        <Button
          mode="contained"
          buttonColor="#111"
          style={styles.btn}
          onPress={() => {
            // if (startAddress == "" || destinationAddress == "") {
            //   setErrorMessage("Invalid address");
            //   setShowErrorMessage(true);
            // } else {
            //   checkIfLocationsAreFine(startAddress, destinationAddress);
            //   if (isGeocodingFine) {
            //     setErrorMessage("");
            //     setShowErrorMessage(false);
            handleAddOrder(startAddress, destinationAddress);
            // }
            // }
          }}
        >
          Invite now
        </Button>

        <Button
          mode="contained"
          buttonColor="#111"
          style={{ marginHorizontal: 70, marginTop: 10 }}
          onPress={() => {
            if (startAddress == "" || destinationAddress == "") {
              setErrorMessage("Invalid address");
              setShowErrorMessage(true);
            } else {
              checkIfLocationsAreFine(startAddress, destinationAddress);
              if (isGeocodingFine) {
                toggleModal();
              } else {
                setErrorMessage("Invalid address");
                setShowErrorMessage(true);
              }
            }
          }}
        >
          Show on map
        </Button>
        {showErrorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={{ flex: 1 }}>
            <PassengerOrderOnMap
              startLat={startLat}
              startLon={startLon}
              destinationLat={destinationLat}
              destinationLon={destinationLon}
            />
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 30,
  },
  btn: {
    marginHorizontal: 70,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
