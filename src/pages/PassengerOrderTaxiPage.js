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
export default function PassengerOrderTaxiPage({ navigation }) {
  const [startAddress, setStartAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // Reverse geocoding
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK") {
            setStartAddress(data.results[0].formatted_address);
          } else {
            console.log("Geocoding failed:", data.status);
          }
        })
        .catch((error) => {
          console.log("Geocoding error:", error);
        });
    })();
  }, []);
  const handleStartAddressChange = (text) => {
    setStartAddress(text);
  };
  const handleDestinationAddressChange = (text) => {
    setDestinationAddress(text);
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
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              position: "absolute",
              top: 0,
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
          placeholder="Destination"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setDestinationAddress(data.description);
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              position: "absolute",
              top: 60,
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
            top: 120,
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
            }}
          />
          <Text>Want to share a ride?</Text>
        </View>
      </View>
      <View
        style={{ flex: 1, position: "absolute", top: 400, left: 0, right: 0 }}
      >
        <Button
          mode="contained"
          buttonColor="#111"
          style={styles.inviteBtn}
          onPress={() => {}}
        >
          Invite now
        </Button>
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
  inviteBtn: {
    marginHorizontal: 70,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
