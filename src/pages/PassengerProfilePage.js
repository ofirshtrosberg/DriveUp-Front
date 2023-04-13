import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ip = "10.0.0.43";

export default function PassengerProfilePage() {
  const navigation = useNavigation();
  const user_name = "Lidor Danon";
  const user_email = "Lid@dan.com";

  // const {email} = route.params;
  // console.log({email});

  // const getUserByEmail = (email) => {
  //   fetch(`http://${ip}:8000/users/${email}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // const user = getUserByEmail({email});
  // console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.color}>
        <Text></Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <UserAvatar size={110} name={user_name} style={styles.avatar} />
        <Icon
          name="edit"
          size={20}
          style={styles.edit_icon}
          onPress={() => {
            navigation.navigate("EditPassenger");
          }}
        ></Icon>
      </View>

      <Text style={styles.passenger_name}>{user_name} </Text>
      <Text style={styles.passenger_email}>{user_email} </Text>

      {/* <Text style={styles.email}>Email:</Text> */}

      <Text>Orders </Text>
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
    fontSize: 20,
    marginLeft: 0,
    marginTop: 20,
    width: 300,
    textAlign: "center",
  },
  passenger_email: {
    color: "#626FB4",
    fontSize: 20,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 10,
  },
  orders_list: {
    backgroundColor: "#000",
    padding: 10,
    width: "80%",
    backgroundColor: "#5F84A2",
    height: 150,
    marginTop: 30,
    marginBottom: 20,
  },
  edit_icon: {
    padding: 5,
    marginLeft: 350,
    marginTop: -50,
  },
});
