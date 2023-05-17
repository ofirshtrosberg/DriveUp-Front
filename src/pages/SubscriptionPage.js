import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Text, View, StyleSheet } from "react-native";
import SubscriptionBasic from "./SubscriptionBasic";
import SubscriptionPremium from "./SubscriptionPremium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { isUserPremium } from "../helperFunctions/accessToBackFunctions";
import HeaderLogout from "../components/HeaderLogout";
import { IP, PORT } from "@env";
export default function SubscriptionPage({ navigation }) {
  const { userToken, login, logout } = useContext(AuthContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Subscription",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);
  const [isPremium, setIsPremium] = useState(false);
const getCurrentSubscription = async () => {
  const value = await AsyncStorage.getItem("currentUserEmail");
  if (value !== null && value !== "") {
    isUserPremium(value, userToken)
      .then((result) => {
        console.log("is premium", result);
        setIsPremium(result);
      })
      .catch((error) => {
        console.error(error);
        setIsPremium(false);
      });
  }
};


  useFocusEffect(
    React.useCallback(() => {
      getCurrentSubscription();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      {!isPremium ? (
        <SubscriptionBasic></SubscriptionBasic>
      ) : (
        <SubscriptionPremium></SubscriptionPremium>
      )}
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
