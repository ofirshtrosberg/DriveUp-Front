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
} from "react-native";
import UserAvatar from "react-native-user-avatar";
// import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { IP, PORT } from "@env";
import { AuthContext } from "../../AuthContext";
import { format } from "date-fns";

export default function PassengerProfilePage(props) {
  const navigation = useNavigation();
  const { email, fullName, phoneNumber, password, imageProfile } = props;
  const { userToken, login, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const myLat = 32.0853;
  const myLon = 34.781769;
  const destLat = 32.794044;
  const destLon = 34.989571;
  const num = 2;

  useEffect(() => {
    getOrderHistory();
  }, []);

  const passengerOrderDrive = async (
    currentUserEmail,
    startLat,
    startLon,
    destinationLat,
    destinationLon,
    numberOfPassengers,
    userToken
  ) => {
    try {
      const response = await fetch(
        "http://" + IP + ":" + PORT + "/passenger/order-drive",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parameter: {
              currentUserEmail: currentUserEmail,
              startLat: parseFloat(startLat),
              startLon: parseFloat(startLon),
              destinationLat: parseFloat(destinationLat),
              destinationLon: parseFloat(destinationLon),
              numberOfPassengers: parseInt(numberOfPassengers),
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add order!");
      }
      const data = await response.json();
      if (data.orderId) {
        console.log(data.orderId);
        getOrderHistory();
        return data.orderId;
      } else {
        console.error("Failed to add order:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const ButtonPress = async () => {
  //   try {
  //     const orderDrive = passengerOrderDrive();
  //     // Do something with the retrieved order history data
  //     console.log("ttytyt", orderDrive);
  //   } catch (error) {
  //     // Handle any errors that occurred during the fetch
  //     console.error(error);
  //   }
  // };

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
      setOrders(orderHistory);
      console.log("orders: ", orders);
      return orderHistory;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePressOrder = (order) => {
    navigation.navigate("OrderDetails");
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
        {/* <View style={styles.color}>
          <Text></Text>
        </View> */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity>
            {imageProfile ? (
              <Image source={{ uri: imageProfile }} style={styles.avatar} />
            ) : (
              <UserAvatar size={110} name={fullName} style={styles.avatar} />
            )}
          </TouchableOpacity>
          <Modal visible={isPopupVisible} onRequestClose={closePopup}>
            <View style={styles.popupContainer}>
              <Image
                // source={require("path/to/profile/image")}
                style={styles.popupImage}
              />
              {/* Add any additional content for the popup */}
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
              });
            }}
          ></Icon>
        </View>
        <Text style={styles.passenger_name}>{fullName} </Text>
        <View style={styles.data_icons_Container}>
          <Icon
            name="envelope"
            size={30}
            color="#608cd7"
            style={styles.email_icon}
          />
          <Text style={styles.passenger_email}>{email} </Text>
          {/* <Text>{imageProfile}</Text> */}
        </View>
        <View style={styles.data_icons_Container}>
          <Icon
            name="phone"
            size={20}
            color="#608cd7"
            style={styles.phone_icon}
          />
          <Text style={styles.passenger_phone}>{phoneNumber} </Text>
        </View>
        <Text style={styles.orders_title}>History Orders </Text>
        <Button
          onPress={() => {
            passengerOrderDrive(
              email,
              myLat,
              myLon,
              destLat,
              destLon,
              num,
              userToken
            );
          }}
        >
          order drive !!
        </Button>
        {/* <Button
        onPress={() => {
          getOrderHistory();
        }}
      >
        the irders
      </Button> */}
        <View style={styles.orders_list}>
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item) => item.orderId.toString()}
          />
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
  color: {
    padding: 10,
    width: "100%",
    backgroundColor: "#5F84A2",
    height: 130,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: -70,
    backgroundColor: "white",
  },
  passenger_name: {
    color: "black",
    fontSize: 22,
    marginLeft: 0,
    marginTop: 20,
    width: 300,
    textAlign: "center",
    fontWeight: "600",
  },
  passenger_email: {
    color: "#626FB4",
    fontSize: 20,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 7,
  },
  passenger_phone: {
    color: "black",
    fontSize: 20,
    marginLeft: 15,
    marginTop: 1,
    marginBottom: 5,
    // textDecorationLine: "underline",
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
  },
  orders_list: {
    backgroundColor: "#000",
    padding: 10,
    width: "90%",
    backgroundColor: "#5F84A2",
    height: 140,
    marginTop: 5,
    marginBottom: 10,
  },
  edit_icon: {
    padding: 5,
    marginLeft: 350,
    marginTop: -50,
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
    backgroundColor: "black",
    borderRadius: 20,
    width: 170,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
