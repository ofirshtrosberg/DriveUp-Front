import React, { useEffect } from "react";
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
import { addOrder } from "../helperFunctions/accessToBackFunctions";
import { useNavigation } from "@react-navigation/core";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
import PassengerOrderOnMap from "./PassengerOrderOnMap";
export default function PassengerOrderTaxiPage({ currentUserEmail }) {
  const navigation = useNavigation();
  const [startAddress, setStartAddress] = useState("");
  const [currAddress, setCurrAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const toggleModal = () => {
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
          setStartAddress(data.results[0].formatted_address);
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
      addOrder(
        currentUserEmail,
        responseStart.results[0].geometry.location.lat,
        responseStart.results[0].geometry.location.lng,
        responseDest.results[0].geometry.location.lat,
        responseDest.results[0].geometry.location.lng,
        numberOfPassengers
      );
      navigation.navigate("OrderResult");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);
    updateCurrentLocation();
  }, []);
  const handleDestinationAddressChange = (text) => {
    setDestinationAddress(text);
  };
  const handleStartAddressChange = (text) => {
    setStartAddress(text);
  };
  const handleNumberOfPassengersChange = (text) => {
    setNumberOfPassengers(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder={startAddress}
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
              setChecked(!checked);
              setStartAddress(currAddress);
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
            if (startAddress == "" || destinationAddress == "") {
              setErrorMessage("Invalid address");
              setShowErrorMessage(true);
            } else {
              setErrorMessage("");
              setShowErrorMessage(false);
              handleAddOrder(startAddress, destinationAddress);
            }
          }}
        >
          Invite now
        </Button>

        <Button
          mode="contained"
          buttonColor="#111"
          style={{ marginHorizontal: 70, marginTop: 10 }}
          onPress={() => {
            toggleModal();
          }}
        >
          Show on map
        </Button>
        {showErrorMessage && <Text>{errorMessage}</Text>}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={{ flex: 1 }}>
            <PassengerOrderOnMap />
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
});
