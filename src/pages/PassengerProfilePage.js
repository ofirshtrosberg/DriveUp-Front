import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function PassengerProfilePage(props) {
  const navigation = useNavigation();
  const { email, fullName, phoneNumber, password } = props;
  const [orders, setOrders] = useState([
    { id: "1", date: "2023-05-07", time: "10:00am" },
    { id: "2", date: "2023-04-08", time: "2:00pm" },
    { id: "4", date: "2023-03-12", time: "11:00am" },
    { id: "5", date: "2023-03-12", time: "11:00am" },
    { id: "6", date: "2023-03-12", time: "11:00am" },
    { id: "7", date: "2023-03-12", time: "11:00am" },
    { id: "8", date: "2023-03-12", time: "12:00am" },
  ]);
  const handlePressOrder = (order) => {
    navigation.navigate("OrderDetails");
  };

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <View style={styles.info}>
        <Text style={styles.date}>
          {item.date} - {item.time}
        </Text>
      </View>
      <TouchableOpacity style={styles.Button} onPress={handlePressOrder}>
        <Text style={styles.textButton}>WATCH ORDER DETAILS</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.color}>
        <Text></Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <UserAvatar size={110} name={fullName} style={styles.avatar} />
        <Icon
          name="edit"
          size={20}
          style={styles.edit_icon}
          onPress={() => {
            navigation.navigate("EditPassenger", {
              fullName,
              email,
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
      <View style={styles.orders_list}>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* <Text>hello</Text>
          <Button
            onPress={() => {
              handlePressOrder;
            }}
            style={styles.Button}
          >
            <Text style={styles.passenger_name}>WATCH ORDER DETAILS </Text>
          </Button> */}
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
    backgroundColor: "#91AEC4",
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
    height: 100,
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
