import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { AuthContext } from "../../AuthContext";
import { Button } from "react-native-paper";
import { GOOGLE_MAPS_API_KEY } from "@env";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import DriverProfilePage from "./DriverProfilePage";
import {
  driveDetails,
  getUserByEmail,
  getEstimatedTime,
  downloadImage,
  rateDriver,
} from "../helperFunctions/accessToBackFunctions";
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
export default function DriveMapPassengerMode({ driveId, orderId }) {
  const navigation = useNavigation();
  const { userToken, login, logout } = useContext(AuthContext);
  const [isModalVisibleProfile, setIsModalVisibleProfile] = useState(false);
  const [orderLocations, setOrderLocations] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [driverEmail, setDriverEmail] = useState("");
  const [driverFullName, setDriverFullName] = useState("");
  const [driverCarColor, setDriverCarColor] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [driverCarModel, setDriverCarModel] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [driverPlateNumber, setDriverPlateNumber] = useState("");
  const [driverImageUrl, setDriverImageUrl] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [rating, setRating] = useState(0);
  const [alreadyRateDriver, setAlreadyRateDriver] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Order Result",
    });
  }, [navigation]);
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const Rating = ({ rating, onRatingChange }) => {
    const handleClick = (value) => {
      onRatingChange(value);
    };
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        const starIcon = i <= rating ? styles.filledStar : styles.emptyStar;
        stars.push(
          <Icon
            key={i}
            name="star"
            size={30}
            style={starIcon}
            onPress={() => handleClick(i)}
          />
        );
      }
      console.log("rating", rating);
      return stars;
    };
    return <View style={styles.ratingContainer}>{renderStars()}</View>;
  };

  const getDriveDetails = async () => {
    try {
      const driveEstimatedTime = await getEstimatedTime(
        orderId,
        userToken,
        navigation,
        logout
      );
      const dateObject = new Date(driveEstimatedTime);
      const time = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setEstimatedTime(time.toString());
      const response = await driveDetails(
        userToken,
        driveId,
        navigation,
        logout
      );
      setDriverEmail(response.orderLocations[0].userEmail);
      const driver = await getUserByEmail(
        response.orderLocations[0].userEmail,
        userToken,
        navigation,
        logout
      );
      setDriverCarColor(driver.carColor);
      setDriverFullName(driver.fullName);
      setDriverCarModel(driver.carModel);
      setDriverPhoneNumber(driver.phoneNumber);
      setDriverPlateNumber(driver.plateNumber);
      setDriverPassword(driver.password);
      setDriverImageUrl(driver.imageUrl);
      setOrderLocations(response.orderLocations);
      setTotalPrice(response.totalPrice);
    } catch (error) {
      console.log("getDriveDetails error");
    }
  };
  useEffect(() => {
    getDriveDetails();
  }, []);
  useEffect(() => {
    if (driverImageUrl !== "" && driverImageUrl !== null)
      downloadImage(driverImageUrl, setImageUri);
  }, [driverImageUrl]);
  useEffect(() => {
    console.log(driverEmail);
  }, [driverEmail]);
  useEffect(() => {
    console.log("rated driver? ", alreadyRateDriver);
  }, [alreadyRateDriver]);
  useEffect(() => {
    console.log("");
  }, [imageUri]);
  if (orderLocations === null) {
    return (
      <ImageBackground
        source={require("../assets/orderBackNew2.png")}
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
  const toggleModalProfile = () => {
    setIsModalVisibleProfile(!isModalVisibleProfile);
  };
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
        <View style={{ flex: 1, flexDirection: "row" }}>
          {imageUri !== null && imageUri !== "" && imageUri !== undefined ? (
            <Image
              style={styles.driverImage}
              source={{ uri: imageUri }}
            ></Image>
          ) : (
            <Image
              style={styles.driverImage}
              source={require("../assets/blankProfilePicture.jpg")}
            ></Image>
          )}

          <View>
            <Text style={styles.driverName}>{driverFullName}</Text>
            <Text style={styles.text}>{driverPhoneNumber}</Text>
            <Button
              mode="contained"
              buttonColor="#76A6ED"
              style={{ marginTop: 10 }}
              onPress={() => {
                setIsModalVisibleProfile(true);
              }}
            >
              Watch Profile
            </Button>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={styles.boldText}>You need to pay: 10$</Text>
          <Text style={styles.boldText}>
            Driver will arrive at: {estimatedTime}
          </Text>
        </View>
      </View>
      <Modal
        isVisible={isModalVisibleProfile}
        onBackdropPress={toggleModalProfile}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={toggleModalProfile}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <DriverProfilePage
              email={driverEmail}
              fullName={driverFullName}
              plateNumber={driverPlateNumber}
              phoneNumber={driverPhoneNumber}
              carModel={driverCarModel}
              password={driverPassword}
              carColor={driverCarColor}
              forOrder="true"
              imageProfile={driverImageUrl}
            />
          </View>
        </View>
      </Modal>
      {!alreadyRateDriver && (
        <>
          <Text style={styles.rateTitle}> Rate your driver </Text>
          <Rating rating={rating} onRatingChange={handleRatingChange} />
          <Button
            onPress={() => {
              rateDriver(driverEmail, rating, userToken, navigation, logout);
              setAlreadyRateDriver(true);
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>SAVE</Text>
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061848",
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
    color: "#fff",
  },
  boldText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  driverName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "transparent",
    zIndex: 10000,
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emptyStar: {
    width: 30,
    height: 30,
    margin: 5,
    color: "#76A6ED",
  },
  filledStar: {
    width: 30,
    height: 30,
    margin: 5,
    color: "gold",
  },
  rateTitle: {
    color: "#76A6ED",
    fontSize: 22,
    marginLeft: 120,
    marginTop: -10,
    textDecorationLine: "underline",
    marginBottom: -10,
    fontWeight: 500,
  },
});
