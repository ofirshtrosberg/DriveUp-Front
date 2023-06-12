import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IP, PORT } from "@env";
import { useSpacingFunc } from "@react-native-material/core";
import { AuthContext } from "../../AuthContext";
import { clearStackAndNavigate } from "../helperFunctions/accessToBackFunctions";
import { format } from "date-fns";
import {
  downloadImage,
  getUserByEmail,
} from "../helperFunctions/accessToBackFunctions";
import { useFocusEffect } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import DriverProfilePage from "./DriverProfilePage";

export default function OrderDetailsPage({ route }) {
  const navigation = useNavigation();
  const { order } = route.params;
  const email = order.driverId;
  const timeDate = order.time;
  const [driver, setDriver] = useState("");
  const { userToken, login, logout } = useContext(AuthContext);
  const [imageUri, setImageUri] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Order details",
    });
  }, [navigation]);
  const fetchUserDownloadImage = async () => {
    try {
      const driver = await getUserByEmail(email, userToken, navigation, logout);
      setDriver(driver);
      console.log("image profile before if", driver.imageUrl);
      if (driver.imageUrl !== "" && driver.imageUrl !== null) {
        await downloadImage(driver.imageUrl, setImageUri);
      }
    } catch (error) {
      console.log("fetchUserDownloadImage error");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDownloadImage();
      return () => {};
    }, [])
  );
  useEffect(() => {
    console.log(driver);
  }, [driver]);
  const formattedTime = format(new Date(timeDate), "HH:mm");
  const formattedDate = format(new Date(timeDate), "dd-MM-yyyy");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/orderdetails.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Text style={styles.orderNumber}>Order Number : {order.orderId}</Text>

          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <UserAvatar
              size={110}
              name={driver.fullName}
              style={styles.avatar}
              textColor={"#061848"}
            />
          )}
          <Text style={styles.data}>{driver.fullName}</Text>

          <Text style={styles.data}>
            {formattedDate} - {formattedTime}
          </Text>
          <Text style={styles.data}>Sum: {order.cost}</Text>
          <Text style={styles.data}>Phone: {driver.phoneNumber}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 41,
    marginLeft: 5,
    backgroundColor: "white",
    marginBottom: 20,
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    width: 340,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  orderNumber: {
    color: "white",
    fontWeight: 700,
    fontSize: 25,
    marginTop: 60,
    marginBottom: 7,
  },
  data: { fontSize: 20, color: "white" },
});
