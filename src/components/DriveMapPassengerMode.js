import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";
import { GOOGLE_MAPS_API_KEY } from "@env";
const orderLocations = [
  {
    userEmail: "d@a.com",
    isDriver: true,
    address: { latitude: 31.78004, longitude: 35.21874 },
    isStartAddress: true,
    price: 0,
  },
  {
    userEmail: "c@a.com",
    isDriver: false,
    address: { latitude: 32.07354, longitude: 34.77508 },
    isStartAddress: true,
    price: 15,
  },
  {
    userEmail: "b@a.com",
    isDriver: false,
    address: { latitude: 31.93212, longitude: 35.04581 },
    isStartAddress: true,
    price: 10,
  },
];
function calculateLatLonDelta(orderLocations) {
  const latitudes = orderLocations.map((location) => location.address.latitude);
  const longitudes = orderLocations.map(
    (location) => location.address.longitude
  );

  const maxLatitude = Math.max(...latitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLongitude = Math.min(...longitudes);

  const latitudeRange = maxLatitude - minLatitude;
  const longitudeRange = maxLongitude - minLongitude;

  const latitudeDelta = latitudeRange * 2;
  const longitudeDelta = longitudeRange * 2;
  return { latitudeDelta, longitudeDelta };
}
export default function DriveMapPassengerMode() {
  const { latitudeDelta, longitudeDelta } =
    calculateLatLonDelta(orderLocations);
  let latitude = 0;
  let longitude = 0;
  orderLocations.map((location, index) => {
    latitude += location.address.latitude;
    longitude += location.address.longitude;
  });
  latitude = latitude / orderLocations.length;
  longitude = longitude / orderLocations.length;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
      >
        {orderLocations.map((location, index) => (
          <Marker key={index} coordinate={location.address}>
            <Callout>
              <Text>{index}</Text>
            </Callout>
          </Marker>
        ))}
        {orderLocations.map((location, index) => {
          if (index < orderLocations.length - 1) {
            const nextLocation = orderLocations[index + 1];
            return (
              <MapViewDirections
                key={index}
                origin={location.address}
                destination={nextLocation.address}
                strokeWidth={3}
                strokeColor="black"
                apikey={GOOGLE_MAPS_API_KEY}
              />
            );
          }
        })}
      </MapView>
      <View style={styles.bottomView}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={styles.driverImage}
            source={require("../assets/img1.png")}
          ></Image>
          <View>
            <Text style={styles.driverName}>Yossi Cohen</Text>
            <Text style={styles.text}>054-1111122</Text>
            <Text style={styles.text}>White Ford, 11112222222</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={styles.boldText}>You need to pay: 10$</Text>
          <Text style={styles.boldText}>Driver will arrive at: 17:43</Text>
          <Button
            mode="contained"
            buttonColor="#111"
            style={{ marginHorizontal: 70, marginTop: 10 }}
            onPress={() => {}}
          >
            Cancel Order
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  driverImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 20,
  },
  boldText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  driverName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
