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
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { RacingSansOne_400Regular } from "@expo-google-fonts/racing-sans-one";
import { useFonts } from "expo-font";
import { Limelight_400Regular } from "@expo-google-fonts/limelight";
import {
  Arima_100Thin,
  Arima_200ExtraLight,
  Arima_300Light,
  Arima_400Regular,
  Arima_500Medium,
  Arima_600SemiBold,
  Arima_700Bold,
} from "@expo-google-fonts/arima";
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
export default function OrderDetailsPage({ route }) {
  const navigation = useNavigation();
  const { order } = route.params;
  const email = order.driverId;
  const timeDate = order.time;
  const [driver, setDriver] = useState("");
  const { userToken, login, logout } = useContext(AuthContext);
  const [imageUri, setImageUri] = useState(null);
  // const [rating, setRating] = useState(0);

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
    Limelight_400Regular,
    RacingSansOne_400Regular,
    Arima_400Regular,
    Arima_600SemiBold,
    Arima_500Medium,
    Arima_700Bold,
    Arima_300Light,
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
    Rubik_300Light_Italic,
    Rubik_400Regular_Italic,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold_Italic,
    Rubik_900Black_Italic,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const formattedTime = format(new Date(timeDate), "HH:mm");
  const formattedDate = format(new Date(timeDate), "dd/MM/yyyy");

  /*                      Rating            */

  // const rateDriver = () => {
  //   fetch("http://" + IP + ":" + PORT + "/rating", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,

  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       rating: rating,
  //       email: email,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status === 401) {
  //         clearStackAndNavigate(navigation, "Login");
  //         logout();
  //         console.error("your token expired or invalid please login");
  //         throw new Error("your token expired or invalid please login");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       navigation.goBack();
  //     })
  //     .catch((error) => {
  //       console.log("error in rateDriver");
  //     });
  // };
  // const handleRatingChange = (value) => {
  //   setRating(value);
  // };

  // const Rating = ({ rating, onRatingChange }) => {
  //   const handleClick = (value) => {
  //     onRatingChange(value);
  //   };
  //   const renderStars = () => {
  //     const stars = [];
  //     for (let i = 1; i <= 5; i++) {
  //       const starIcon = i <= rating ? styles.filledStar : styles.emptyStar;
  //       stars.push(
  //         <Icon
  //           key={i}
  //           name="star"
  //           size={30}
  //           style={starIcon}
  //           onPress={() => handleClick(i)}
  //         />
  //       );
  //     }
  //     console.log("rating", rating);
  //     return stars;
  //   };
  //   return <View style={styles.ratingContainer}>{renderStars()}</View>;
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/orderdetails.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.dataContainer}>
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
          <View style={styles.driverData}>
            <View style={styles.data_icons_Container}>
              <FontAwesome name="user-o" size={24} style={styles.user_icon} />
              <Text style={styles.data}>Driver : {driver.fullName}</Text>
            </View>
            <Text style={styles.data}>Phone : {driver.phoneNumber}</Text>
          </View>
          <View style={styles.orderData}>
            <Text style={styles.data}>
              {formattedDate}  ,  {formattedTime}
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
          {/* <Rating rating={rating} onRatingChange={handleRatingChange} /> */}
          {/* <Button onPress={() => rateDriver()}>save</Button> */}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },

  // ratingContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 20,
  // },
  // emptyStar: {
  //   width: 30,
  //   height: 30,
  //   margin: 5,
  //   color: "gray",
  // },
  // filledStar: {
  //   width: 30,
  //   height: 30,
  //   margin: 5,
  //   color: "gold",
  // },
  dataContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -170,
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 100,
    marginTop: 40,
    marginLeft: 3,
    backgroundColor: "white",
    marginBottom: 40,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  orderNumber: {
    fontSize: 30,
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
  driverData: { marginBottom: 45 },
});
