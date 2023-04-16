import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import DriverProfile from "./DriverProfilePage";
import PassengerProfile from "./PassengerProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentUserContext from "../../CurrentUserContext";
const isDriver = true;

export default function ProfilePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isDriver && <DriverProfile></DriverProfile>}
      {!isDriver && <PassengerProfile></PassengerProfile>}
      <View>
        <Button
          style={styles.sub_btn}
          mode="contained"
          buttonColor="#111"
          onPress={() => {
            navigation.navigate("Subscription");
          }}
        >
          Subscription
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  sub_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
    marginRight: 20,
    width: "50%",
  },
});
