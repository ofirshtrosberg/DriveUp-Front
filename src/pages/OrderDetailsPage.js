import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IP, PORT } from "@env";
import { useSpacingFunc } from "@react-native-material/core";
import { AuthContext } from "../../AuthContext";
import { clearStackAndNavigate } from "../helperFunctions/accessToBackFunctions";
export default function OrderDetailsPage({ route }) {
  const navigation = useNavigation();
  const { order } = route.params;
  const email = order.driverId;
  const [driver, setDriver] = useState("");
  const { userToken, login, logout } = useContext(AuthContext);
  useEffect(() => {
    getUserByEmail(email);
  }, []);

  const getUserByEmail = (email) => {
    fetch("http://" + IP + ":" + PORT + "/users/" + email)
      .then((response) => {
        if (response.status === 401) {
          clearStackAndNavigate(navigation, "Login");
          logout();
          throw new Error("your token expired or invalid please login");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDriver(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Order Number:{order.orderId}</Text>
      <Text>Sum:{order.cost}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
