import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IP, PORT } from "@env";
import { useSpacingFunc } from "@react-native-material/core";
import { AuthContext } from "../../AuthContext";
import { clearStackAndNavigate } from "../helperFunctions/accessToBackFunctions";
import { format } from "date-fns";
import { downloadImage } from "../helperFunctions/accessToBackFunctions";
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
  const [imageProfile, setImageProfile] = useState("");
  const [rating, setRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    // setShowErrorMessage(false);
    setIsModalVisible(!isModalVisible);
  };

  useFocusEffect(
    React.useCallback(async () => {
      await getUserByEmail(email, userToken, navigation, logout);
      setTimeout(async () => {
        if (imageProfile !== "" && imageProfile !== null) {
          await downloadImage(imageProfile, setImageUri);
        }
      }, 2000);
      return () => {};
    }, [])
  );


  const formattedTime = format(new Date(timeDate), "HH:mm");
  const formattedDate = format(new Date(timeDate), "dd-MM-yyyy");

  const getUserByEmail = async (email, userToken, navigation, logout) => {
    fetch("http://" + IP + ":" + PORT + "/users/" + email, {
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
          throw new Error("your token expired or invalid please login");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data.result", data.result);
        // resolve(data.result);
        setDriver(data.result);
        setImageProfile(driver.imageUrl);
      })
      .catch((error) => {
        console.log("getUserByEmail error");
        // reject("aaa", error);
      });
  };

  const rateDriver = () => {
    fetch("http://" + IP + ":" + PORT + "/rating", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        email: email,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          clearStackAndNavigate(navigation, "Login");
          logout();
          throw new Error("your token expired or invalid please login");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data:", data);
        navigation.goBack();
      })
      .catch((error) => {
        console.log("error:", error);
      
      });
  };

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

  return (
    <View style={styles.container}>
      <Text>Order Number: {order.orderId}</Text>
      <Text style={styles.date}>
        {formattedDate} - {formattedTime}
      </Text>
      <Text>Sum: {order.cost}</Text>
      <Text>{driver.fullName}</Text>
      {/* <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
      >
        <Text>show profile</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ flex: 1 }}>
          <DriverProfilePage></DriverProfilePage>
        </View>
      </Modal> */}
      <TouchableOpacity>
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
      </TouchableOpacity>
      <Rating rating={rating} onRatingChange={handleRatingChange} />

      <Button onPress={() => rateDriver()}>save</Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    color: "gray",
  },
  filledStar: {
    width: 30,
    height: 30,
    margin: 5,
    color: "gold",
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: 9,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    width: 340,
  },
});
