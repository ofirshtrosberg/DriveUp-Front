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
} from "react-native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { IP, PORT } from "@env";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../../AuthContext";
import { useFonts } from "expo-font";
import {
  Arima_700Bold,
  Arima_400Regular,
  Arima_500Medium,
  Arima_600SemiBold,
} from "@expo-google-fonts/arima";
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
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
  const [imageUri, setImageUri] = useState(null);
  const [rating, setRating] = useState("Not available");
  const formattedRating = parseFloat(rating).toFixed(2);

  const { userToken, login, logout } = useContext(AuthContext);

  const downloadImageGetRating = async () => {
    try {
      getRating(email);
      if (imageProfile !== "" && imageProfile !== null)
        await downloadImage(imageProfile, setImageUri);
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      downloadImageGetRating();
      return () => {};
    }, [])
  );

  useEffect(() => {
    console.log("");
  }, [imageUri]);

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
    Arima_700Bold,
    Arima_400Regular,
    Arima_500Medium,
    Arima_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/profilePage.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity>
              {imageUri ? (
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
                style={styles.edit_icon}
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
              ></Icon>
            )}
          </View>
          <Text style={styles.driver_name}>{fullName} </Text>
          <View style={styles.data_icons_Container}>
            <Icon
              name="envelope"
              size={30}
              color="#608cd7"
              style={styles.email_icon}
            />
            <Text style={styles.driver_email}>{email} </Text>
          </View>
          <View style={styles.data_icons_Container}>
            <Icon
              name="phone"
              size={20}
              color="#608cd7"
              style={styles.phone_icon}
            />
            <Text style={styles.driver_phone}>{phoneNumber} </Text>
          </View>

          <Text style={styles.driver_carModel}>My car : {carModel}</Text>
          <Text style={styles.driver_carModel}>Car Number: {plateNumber} </Text>
          {/* <Text style={styles.driver_plateNumber}>Car Number: {plateNumber} </Text> */}
          {/* <View style={styles.review_list}></View> */}
          <View>
            {forOrder === "false" && (
              <Button
                style={styles.sub_btn}
                mode="contained"
                buttonColor="#111"
                onPress={() => {
                  navigation.navigate("Subscription");
                }}
              >
                <Text style={styles.sub_text}>Subscription</Text>
              </Button>
            )}
            {rating !== "" && (
              <Text style={styles.rating}>rating: {formattedRating}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginTop: 102.5,
    marginLeft: 9,
    backgroundColor: "white",
  },
  driver_name: {
    color: "white",
    fontSize: 26,
    marginLeft: 10,
    marginTop: 55,
    width: 400,
    textAlign: "center",
    // fontWeight: "600",
    fontFamily: "Arima_700Bold",
  },
  rating: {
    color: "white",
    fontSize: 26,
    marginLeft: 10,
    marginTop: 30,
    width: 400,
    textAlign: "center",
    fontFamily: "Arima_600SemiBold",
  },
  data_icons_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginRight: 30,
  },
  email_icon: { marginLeft: -10, marginRight: 20, color: "#76A6ED" },
  phone_icon: {
    transform: [{ rotate: "95deg" }],
    marginTop: -5,
    color: "#76A6ED",
  },
  driver_phone: {
    color: "white",
    fontSize: 22,
    marginLeft: 15,
    marginTop: 1,
    marginBottom: 5,
    fontFamily: "Arima_700Bold",
  },
  driver_email: {
    color: "white",
    fontSize: 22,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 7,
    fontFamily: "Arima_700Bold",
  },
  driver_carModel: {
    color: "white",
    fontSize: 24,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 5,
  },
  driver_plateNumber: {
    color: "black",
    fontSize: 22,
    marginLeft: 160,
    marginTop: 4,
    marginBottom: 10,
  },
  edit_icon: {
    padding: 10,
    marginLeft: 330,
    marginTop: -90,
    color: "#76A6ED",
  },
  sub_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 130,
    width: "50%",
    backgroundColor: "#76A6ED",
    marginTop: 20,
  },

  sub_text: { fontSize: 20, color: "#061848", fontWeight: "bold" },
});
