import Icon from "react-native-vector-icons/FontAwesome5";
// import Icon from "react-native-vector-icons/Feather";

import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { IP, PORT } from "@env";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../../AuthContext";
import { useFonts } from "expo-font";
import { Arima_600SemiBold, Arima_700Bold } from "@expo-google-fonts/arima";

import { downloadImage } from "../helperFunctions/accessToBackFunctions";
export default function DriverProfilePage(props) {
  const navigation = useNavigation();
  const {
    email,
    fullName,
    plateNumber,
    phoneNumber,
    carModel,
    password,
    carColor,
    forOrder,
    imageProfile,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [rating, setRating] = useState("Not available");
  const formattedRating = parseFloat(rating).toFixed(2);
  const { userToken, login, logout } = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      console.log("(((", imageProfile);
      setIsLoading(true);
      downloadImageGetRating();
      return () => {};
    }, [])
  );
  const downloadImageGetRating = async () => {
    try {
      getRating(email);
      if (imageProfile !== "" && imageProfile !== null)
        await downloadImage(imageProfile, setImageUri);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("aaaaaa ", imageUri);
  }, [imageUri]);
  useEffect(() => {
    console.log("in profile", imageProfile);
    if (imageProfile !== "" && imageProfile !== null)
      downloadImage(imageProfile, setImageUri);
  }, [imageProfile]);

  const getRating = (email) => {
    fetch("http://" + IP + ":" + PORT + "/rating/" + email, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          clearStackAndNavigate(navigation, "Login");
          logout();
          console.error("your token expired or invalid please login");
          throw new Error("your token expired or invalid please login");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.rating !== undefined && data.rating !== null)
          setRating(data.rating.toString());
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    console.log("rating changed", rating);
  }, [rating]);

  const [fontsLoaded] = useFonts({
    Arima_600SemiBold,
    Arima_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <ImageBackground
        source={require("../assets/profilePage.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/profilePage.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity>
              {imageUri !== null &&
              imageUri !== "" &&
              imageUri !== undefined ? (
                <Image source={{ uri: imageUri }} style={styles.avatar} />
              ) : (
                <UserAvatar
                  size={110}
                  name={fullName}
                  style={styles.avatar}
                  textColor={"#061848"}
                />
              )}
            </TouchableOpacity>
            {forOrder === "false" && (
              <Icon
                name="edit"
                size={20}
                style={styles.editIcon}
                onPress={() => {
                  navigation.navigate("EditDriver", {
                    fullName,
                    phoneNumber,
                    email,
                    carModel,
                    plateNumber,
                    password,
                    carColor,
                    imageProfile,
                    imageUri,
                  });
                }}
              />
            )}
          </View>
          <Text style={styles.driverName}>{fullName} </Text>
          <View style={styles.dataIconsContainer}>
            <Icon
              name="envelope"
              size={30}
              color="#608cd7"
              style={styles.emailIcon}
            />
            <Text style={styles.driverEmail}>{email} </Text>
          </View>
          <View style={styles.dataIconsContainer}>
            <Icon
              name="phone"
              size={20}
              color="#608cd7"
              style={styles.phoneIcon}
            />
            <Text style={styles.driverPhone}>{phoneNumber} </Text>
          </View>
          <View style={styles.CarModelContainer}>
            <Text style={styles.driverCarModelTitle}>Car Number:</Text>
            <Text style={styles.driverCarModel}>{plateNumber}</Text>
          </View>
          <View style={styles.CarModelContainer}>
            <Text style={styles.driverCarModelTitle}>My Car:</Text>
            <Text style={styles.driverCarModel}>{carModel}</Text>
          </View>
          {/* {isLoading && (
            <View style={{ alignItems: "center" }}>
            
              <Text style={{ marginTop: 50, color: "white", fontSize: 22 }}>
                Loading image & rating...
              </Text>
            </View>
          ) : ( */}
          <View>
            {forOrder === "false" && (
              <Button
                style={styles.subButton}
                mode="contained"
                buttonColor="#111"
                onPress={() => {
                  navigation.navigate("Subscription");
                }}
              >
                <Text style={styles.subButtonText}>Subscription</Text>
              </Button>
            )}
          </View>
          {isLoading ? (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 20,
                  color: "white",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Loading image & rating...
              </Text>
            </View>
          ) : (
            rating !== "" && (
              <Text style={styles.rating}>rating: {formattedRating}</Text>
            )
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderRadius: (Dimensions.get("window").width * 0.3) / 2,
    marginTop: Dimensions.get("window").height * 0.1,
    backgroundColor: "white",
  },
  editIcon: {
    marginTop: Dimensions.get("window").height * -0.075,
    marginLeft: Dimensions.get("window").width * 0.7,
    color: "#fff",
  },
  driverName: {
    color: "white",
    fontSize: 26,
    marginTop: Dimensions.get("window").height * 0.055,
    width: Dimensions.get("window").width * 0.9,
    textAlign: "center",
    fontFamily: "Arima_700Bold",
  },
  rating: {
    color: "white",
    fontSize: 26,
    marginTop: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.9,
    textAlign: "center",
    fontFamily: "Arima_600SemiBold",
  },
  dataIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Dimensions.get("window").width * 0.075,
  },
  emailIcon: {
    marginLeft: -10,
    marginRight: 20,
    color: "#76A6ED",
  },
  phoneIcon: {
    transform: [{ rotate: "95deg" }],
    marginTop: -5,
    color: "#76A6ED",
  },
  driverPhone: {
    color: "white",
    fontSize: 22,
    marginLeft: 15,
    marginTop: 1,
    marginBottom: 0,
  },
  driverEmail: {
    color: "white",
    fontSize: 22,
    marginTop: 4,
    marginBottom: 7,
  },
  CarModelContainer: { flexDirection: "row" },
  driverCarModelTitle: {
    color: "white",
    fontSize: 22,
    marginTop: Dimensions.get("window").height * 0.01,
    marginBottom: 2,
    textDecorationLine: "underline",
  },
  driverCarModel: {
    color: "white",
    fontSize: 22,
    marginTop: Dimensions.get("window").height * 0.01,
    marginBottom: 2,
    marginLeft: Dimensions.get("window").width * 0.02,
  },
  subButton: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.5,
    backgroundColor: "#76A6ED",
    marginTop: Dimensions.get("window").height * 0.02,
    // marginLeft: Dimensions.get("window").width * 0.0,
  },
  subButtonText: {
    fontSize: 20,
    color: "#061848",
    fontWeight: "bold",
  },
});
