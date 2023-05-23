import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { AuthContext } from "../../AuthContext";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useRoute } from "@react-navigation/native";
import { driveDetails } from "../helperFunctions/accessToBackFunctions";
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
export default function DriveOnMapDriverMode() {
  const { userToken, login, logout } = useContext(AuthContext);
  const route = useRoute();
  const { driveId } = route.params;
  console.log("driveid:", driveId);
  useEffect(() => {
    driveDetails(userToken,driveId);
  });
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
        <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
          <View style={styles.passengerImgPrice}>
            <Image
              style={styles.img}
              source={require("../assets/1761892.png")}
            ></Image>
            <Text>12$</Text>
          </View>
          <View style={styles.passengerImgPrice}>
            <Image
              style={styles.img}
              source={require("../assets/User-Avatar-in-Suit-PNG.png")}
            ></Image>
            <Text>10$</Text>
          </View>
          <View style={styles.passengerImgPrice}>
            <Image
              style={styles.img}
              source={require("../assets/img1.png")}
            ></Image>
            <Text>9$</Text>
          </View>
          <View style={styles.passengerImgPrice}>
            <Image
              style={styles.img}
              source={require("../assets/person5.png")}
            ></Image>
            <Text>8$</Text>
          </View>
          <View style={styles.passengerImgPrice}>
            <Image
              style={styles.img}
              source={require("../assets/images.png")}
            ></Image>
            <Text>7$</Text>
          </View>
          <View style={styles.passengerImgPrice}>
            <Image
              style={styles.img}
              source={require("../assets/img1.png")}
            ></Image>
            <Text>15$</Text>
          </View>
        </View>
        <View style={{ flex: 2, marginTop: 20 }}>
          <Text style={styles.boldText}>Order number: 123456</Text>
          <Text style={styles.boldText}>Profit: 61$</Text>
          <Button
            mode="contained"
            buttonColor="#111"
            style={{ marginHorizontal: 70, marginTop: 10 }}
            onPress={() => {}}
          >
            Accept Order
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
  img: {
    marginTop: 10,
    width: "70%",
    height: undefined,
    aspectRatio: 5 / 5,
    borderRadius: 50,
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
  passengerImgPrice: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
});
