import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import {
  Button,
  Checkbox,
  Provider as PaperProvider,
} from "react-native-paper";
import { useState } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { passengerOrderDrive } from "../helperFunctions/accessToBackFunctions";
import { useNavigation } from "@react-navigation/core";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
import theme from "../config/theme";
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
  const [errorMessageDetails, setErrorMessageDetails] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isGeocodingFine, setIsGeocodingFine] = useState(false);
  const [startLat, setStartLat] = useState(0);
  const [destinationLat, setDestinationLat] = useState(0);
  const [startLon, setStartLon] = useState(0);
  const [destinationLon, setDestinationLon] = useState(0);
  // console.log("key", GOOGLE_MAPS_API_KEY);
  const checkLocationsForMap = async () => {
    setErrorMessage("");
    try {
      const response = await checkIfLocationsAreFine(
        startAddress,
        destinationAddress
      );
      console.log("fine before if", isGeocodingFine);
      if (response === true) {
        console.log("isGeocodingFine", isGeocodingFine);
        toggleModal();
        setShowErrorMessage(false);
      } else {
        setErrorMessage("Invalid address");
        setShowErrorMessage(true);
      }
    } catch (error) {
      setErrorMessage("Invalid address");
      setShowErrorMessage(true);
    }
  };
  const toggleModal = () => {
    setErrorMessage("");
    setShowErrorMessage(false);
    setIsModalVisible(!isModalVisible);
  };
  const updateCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
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
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === "OK") {
            setCurrAddress(data.results[0].formatted_address);
            console.log(currAddress);
          } else {
            console.log("Geocoding failed:", data.status);
          }
        })
        .catch((error) => {
          console.log("Geocoding error");
        });
    } catch (error) {
      console.log("Error in updateCurrentLocation");
    }
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
        userToken,
        navigation,
        logout
      );
      setErrorMessage("");
      setErrorMessageDetails("");
      setShowErrorMessage(false);
      navigation.navigate("OrderResult", { orderId: response });
    } catch (error) {
      setErrorMessage("Order Failed:");
      setErrorMessageDetails(
        "addresses must be valid,\ninside Israel and accessible to car"
      );
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
      return true;
    } catch (error) {
      setErrorMessage("Invalid address");
      setIsGeocodingFine(false);
      return false;
    }
  };
  useEffect(() => {
    console.log(startLat);
  }, [startLat]);
  useEffect(() => {
    console.log("fine?", isGeocodingFine);
  }, [isGeocodingFine]);
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
    console.log(currAddress);
  }, [currAddress]);
  useEffect(() => {
    console.log("");
  }, [errorMessageDetails]);
  useEffect(() => {
    console.log("error msg:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log(showErrorMessage);
  }, [showErrorMessage]);
  useEffect(() => {
    console.log("start change", startLat, startLon);
  }, [startAddress]);
  useEffect(() => {
    // console.log(GOOGLE_MAPS_API_KEY)
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
    // <PaperProvider theme={theme}>
    // <KeyboardAvoidingView style={styles.container}>
    <View style={styles.container}>
      {/* <ImageBackground
        source={require("../assets/orderBackNew.png")}
        resizeMode="cover"
        style={styles.image}
      > */}
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
              maxHeight: 130,
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
              maxHeight: 130,
            },
          }}
        />
        <TextInput
          value={numberOfPassengers}
          keyboardType="numeric"
          maxLength={2}
          style={{
            backgroundColor: "#fff",
            height: 46,
            zIndex: 100,
            position: "absolute",
            top: 130,
            width: 160,
            alignSelf: "center",
            borderRadius: 10,
            textAlign: "center",
          }}
          onChangeText={handleNumberOfPassengersChange}
          placeholder="Number of passengers"
        />
        {currAddress !== "" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 220,
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
              color="#fff"
            />
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Use current location as start address
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 320,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setErrorMessage("");
            setErrorMessageDetails("");
            if (startAddress == "" || destinationAddress == "") {
              setErrorMessage("Invalid address");
              setShowErrorMessage(true);
            } else if (numberOfPassengers == "") {
              setErrorMessage("Invalid passengers amount");
            } else {
              handleAddOrder(startAddress, destinationAddress);
            }
          }}
          style={{
            width: 130,
            height: 50,
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 20,
            // zIndex: 11,
            // marginLeft: 200,
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
                // zIndex: 13,
              }}
            >
              Order now
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setErrorMessage("");
            setErrorMessageDetails("");
            if (startAddress == "" || destinationAddress == "") {
              setErrorMessage("Invalid address");
              setShowErrorMessage(true);
            } else {
              checkLocationsForMap();
            }
          }}
          style={{
            width: 170,
            height: 50,
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 10,
            // marginLeft: 170,
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
              Show on map
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {showErrorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <Text style={{ color: "#fff", marginTop: 5, textAlign: "center" }}>
          {errorMessageDetails}
        </Text>
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
      {/* </ImageBackground> */}
    </View>
    /* </KeyboardAvoidingView> */
    /* </PaperProvider> */
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061848",
  },
  image: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
    // marginLeft: 185,
    marginTop: 17,
  },
});
