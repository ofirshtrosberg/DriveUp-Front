import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../AuthContext";
import { format } from "date-fns";
import {
  downloadImage,
  getUserByEmail,
} from "../helperFunctions/accessToBackFunctions";
import { useFocusEffect } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Arima_700Bold } from "@expo-google-fonts/arima";
import { Rubik_500Medium } from "@expo-google-fonts/rubik";
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

  const [fontsLoaded] = useFonts({
    Arima_700Bold,
    Rubik_500Medium,
  });
  if (!fontsLoaded) {
    return (
      <ImageBackground
        source={require("../assets/orderdetails.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%",justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color:"white" , fontSize:20}}>Loading...</Text>
      </ImageBackground>
    );
  }

  const formattedTime = format(new Date(timeDate), "HH:mm");
  const formattedDate = format(new Date(timeDate), "dd/MM/yyyy");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/orderdetails.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.orderNumber}>Order Number : {order.orderId}</Text>
          <View style={styles.avatarContainer}>
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
          </View>
          <View style={styles.driverData}>
            <View style={styles.dataIconsContainer}>
              <FontAwesome name="user-o" size={24} style={styles.user_icon} />
              <Text style={styles.data}>Driver : {driver.fullName}</Text>
            </View>
            <Text style={styles.data}>Phone : {driver.phoneNumber}</Text>
          </View>
          <View style={styles.orderData}>
            <Text style={styles.data}>
              {formattedDate} , {formattedTime}
            </Text>
            <View style={styles.data_icons_Container}>
              <Text style={styles.data}>You pay : {order.cost}</Text>
              <FontAwesome
                name="shekel"
                size={20}
                color="white"
                style={{ marginLeft: 5, marginRight: -25, marginBottom: 10 }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: Dimensions.get("window").width * 0.27,
    height: Dimensions.get("window").width * 0.27,
    borderRadius: (Dimensions.get("window").width * 0.3) / 2,
    marginTop: Dimensions.get("window").height * 0.055,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dataIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Dimensions.get("window").width * 0.05,
    marginTop: Dimensions.get("window").height * 0.04,
  },

  orderNumber: {
    marginTop: Dimensions.get("window").height * 0.02,
    fontSize: 30,
    fontFamily: "Arima_700Bold",
    color: "#B5D0FF",
  },
  data: {
    fontSize: 20,
    color: "white",
    fontFamily: "Rubik_500Medium",
    marginBottom: 10,
  },
  user_icon: {
    marginLeft: 0,
    color: "white",
    marginRight: 10,
    marginBottom: 10,
  },
  data_icons_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  driverData: {
    marginBottom: Dimensions.get("window").height * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
  },
});
