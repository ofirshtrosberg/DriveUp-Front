import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getUserByEmail } from "../../AsyncStorageUsers";

const ip = "10.0.0.43";

export default function PassengerProfilePage() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  // console.log(user.email);
  // console.log(user.full_name);
  // console.log(user.phone_number);

  const myemail = "b@b.com";
  const email = user.email;
  const fullName = user.full_name;
  const phoneNumber = user.phone_number;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Call the getUserByEmail function to get the user by email
        const fetchedUser = await getUserByEmail(myemail);

        // Set the fetched user in state
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [myemail]);

  return (
    <View style={styles.container}>
      <View style={styles.color}>
        <Text></Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <UserAvatar size={110} name={user.full_name} style={styles.avatar} />
        <Icon
          name="edit"
          size={20}
          style={styles.edit_icon}
          onPress={() => {
            navigation.navigate("EditPassenger", {
              fullName,
              phoneNumber,
              email,
            });
          }}
        ></Icon>
      </View>

      <Text style={styles.passenger_name}>{fullName} </Text>
      <Text style={styles.passenger_email}>{email} </Text>
      <Text style={styles.passenger_phone}>Phone Number : {phoneNumber}</Text>

      <Text style={styles.orders_title}>History Orders </Text>
      <View style={styles.orders_list}>
        <ScrollView>
          <Text>hello</Text>
        </ScrollView>
      </View>
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
    marginLeft: 0,
    marginTop: 1,
    marginBottom: 5,
    // textDecorationLine: "underline",
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
    width: "80%",
    backgroundColor: "#5F84A2",
    height: 150,
    marginTop: 5,
    marginBottom: 10,
  },
  edit_icon: {
    padding: 5,
    marginLeft: 350,
    marginTop: -50,
  },
});
