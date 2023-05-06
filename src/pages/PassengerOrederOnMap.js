import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
const origin = { latitude: 37.78899, longitude: -122.4324 };
const destination = { latitude: 37.78935, longitude: -122.45 };

export default function PassengerOrderOnMap () {
  const latitude = (origin.latitude + destination.latitude) / 2;
  const longitude = (origin.longitude + destination.longitude) / 2;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: Math.abs(origin.latitude - destination.latitude) + 0.02,
        longitudeDelta:
          Math.abs(origin.longitude - destination.longitude) + 0.02,
      }}
    >
      <Marker coordinate={origin} title="Origin" />
      <Marker coordinate={destination} title="Destination" />
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_API_KEY}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
