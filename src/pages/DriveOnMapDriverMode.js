import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { AuthContext } from "../../AuthContext";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { driveDetails } from "../helperFunctions/accessToBackFunctions";
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
  const navigation = useNavigation();
  const { userToken, login, logout } = useContext(AuthContext);
  const route = useRoute();
  const { driveId } = route.params;
  console.log("driveid in DriveOnMapDriverMode:", driveId);
  const [orderLocations, setOrderLocations] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDriveAccepted, setIsDriveAccepted] = useState(false);
  const getDriveDetails = async () => {
    try {
      const response = await driveDetails(userToken, driveId, navigation);
      setOrderLocations(response.orderLocations);
      setTotalPrice(response.totalPrice);
      console.log(orderLocations);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDriveDetails();
  }, []);
  if (orderLocations === null) {
    return (
      <ImageBackground
        source={require("../assets/backgroundDriveup.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View>
          <Text style={{ color: "#fff", fontSize: 30 }}>
            Finding you a drive
          </Text>
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 10 }}
          />
        </View>
      </ImageBackground>
    );
  }
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
        {orderLocations.map((location, index) =>
          location.isStartAddress ? (
            location.isDriver ? (
              <Marker
                key={index}
                coordinate={location.address}
                pinColor="yellow"
              >
                <Callout>
                  <Text>{location.userEmail}, driver</Text>
                </Callout>
              </Marker>
            ) : (
              <Marker key={index} coordinate={location.address} pinColor="blue">
                <Callout>
                  <Text>{location.userEmail}, passenger start location</Text>
                </Callout>
              </Marker>
            )
          ) : (
            <Marker key={index} coordinate={location.address}>
              <Callout>
                <Text>{location.userEmail}</Text>
              </Callout>
            </Marker>
          )
        )}

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
          {orderLocations.map((location, index) => {
            if (location.isStartAddress && !location.isDriver) {
              return (
                <View key={index} style={styles.passengerImgPrice}>
                  <Image
                    style={styles.img}
                    source={require("../assets/1761892.png")}
                  ></Image>
                  <Text>{location.price}$</Text>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={{ flex: 2, marginTop: 20 }}>
          <Text style={styles.boldText}>Profit: {totalPrice}$</Text>
          {!isDriveAccepted && (
            <Button
              mode="contained"
              buttonColor="#111"
              style={{ marginHorizontal: 70, marginTop: 10 }}
              onPress={() => {
                setIsDriveAccepted(true);
              }}
            >
              Accept Order
            </Button>
          )}
          {isDriveAccepted && (
            <Button
              mode="contained"
              buttonColor="#111"
              style={{ marginHorizontal: 70, marginTop: 10 }}
              onPress={() => {
                setIsDriveAccepted(true);
                navigation.goBack();
              }}
            >
              Finish order
            </Button>
          )}
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
    maxWidth: 70,
    maxHeight: 70,
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
