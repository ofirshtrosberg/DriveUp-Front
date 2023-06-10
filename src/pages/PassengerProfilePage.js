import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { IP, PORT } from "@env";
import { AuthContext } from "../../AuthContext";
import { format } from "date-fns";
import axios from "axios";
import { downloadImage } from "../helperFunctions/accessToBackFunctions";
export default function PassengerProfilePage(props) {
  const navigation = useNavigation();
  const { email, fullName, phoneNumber, password, imageProfile } = props;
  const { userToken, login, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const [imageUri, setImageUri] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      if (imageProfile !== "" && imageProfile !== null)
        downloadImage(imageProfile, setImageUri);
      getOrderHistory();
      return () => {};
    }, [])
  );

  useEffect(() => {
    console.log("image uri");
  }, [imageUri]);

  const getOrderHistory = async (page = 1, size = 20) => {
    try {
      const response = await fetch(
        "http://" +
          IP +
          ":" +
          PORT +
          "/passenger/order-history/?page=" +
          page +
          "&size=" +
          size,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve order history");
      }
      const orderHistory = await response.json();
      const filteredOrders = orderHistory.filter(
        (order) => order.driverId !== null
      );
      setOrders(filteredOrders);
      return filteredOrders;
    } catch (error) {
      console.log("getOrderHistory error");
    }
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleImageTap = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const renderItem = ({ item }) => {
    const formattedTime = format(new Date(item.time), "HH:mm");
    const formattedDate = format(new Date(item.time), "dd-MM-yyyy");
    const handlePressOrder = () => {
      navigation.navigate("OrderDetails", { order: item });
    };

    return (
      <View style={styles.listContainer}>
        <View style={styles.info}>
          <Text style={styles.date}>
            {formattedDate} - {formattedTime}
          </Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handlePressOrder}>
          <Text style={styles.textButton}>WATCH ORDER DETAILS</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
            <Modal visible={isPopupVisible} onRequestClose={closePopup}>
              <View style={styles.popupContainer}>
                <Image style={styles.popupImage} />
              </View>
            </Modal>
            <Icon
              name="edit"
              size={20}
              style={styles.edit_icon}
              onPress={() => {
                navigation.navigate("EditPassenger", {
                  fullName,
                  email,
                  imageProfile,
                  password,
                  imageUri,
                });
              }}
            ></Icon>
          </View>
          <Text style={styles.passenger_name}>{fullName} </Text>
          <View style={styles.data_icons_Container}>
            <Icon
              name="envelope"
              size={30}
              color="#76A6ED"
              style={styles.email_icon}
            />
            <Text style={styles.passenger_email}>{email} </Text>
          </View>
          <View style={styles.data_icons_Container}>
            <Icon
              name="phone"
              size={20}
              color="#76A6ED"
              style={styles.phone_icon}
            />
            <Text style={styles.passenger_phone}>{phoneNumber} </Text>
          </View>
          <Text style={styles.orders_title}>Orders History </Text>

          <View style={styles.orders_list}>
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={(item) => item.orderId.toString()}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  passenger_name: {
    color: "white",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 70,
    width: 400,
    textAlign: "center",
    fontWeight: "600",
  },
  passenger_email: {
    color: "white",
    fontSize: 20,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 7,
  },
  passenger_phone: {
    color: "white",
    fontSize: 20,
    marginLeft: 15,
    marginTop: 1,
    marginBottom: 5,
  },
  email_icon: { marginLeft: -10, marginRight: 20 },
  phone_icon: { transform: [{ rotate: "95deg" }], marginTop: -5 },
  data_icons_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginRight: 30,
  },
  orders_title: {
    fontSize: 20,
    padding: 10,
    marginTop: 5,
    marginBottom: 0,
    textDecorationLine: "underline",
    fontWeight: "400",
    color: "white",
  },
  orders_list: {
    padding: 10,
    width: "90%",
    backgroundColor: "#76A6ED",
    height: 140,
    marginTop: 5,
    marginBottom: 10,
  },
  edit_icon: {
    padding: 5,
    marginLeft: 370,
    marginTop: -90,
    color: "#76A6ED",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  info: {
    flex: 1,
  },
  Button: {
    backgroundColor: "#061848",
    borderRadius: 20,
    width: 180,
    marginRight: -10,
    height: 25,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    marginTop: 3,
  },
  date: {
    color: "#061848",
    fontSize: 16.5,
    fontWeight: "bold",
    marginLeft: -10,
  },
});
