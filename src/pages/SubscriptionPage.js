import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SubscriptionBasic from "./SubscriptionBasic";
import SubscriptionPremium from "./SubscriptionPremium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { isUserPremium } from "../helperFunctions/accessToBackFunctions";
import HeaderLogout from "../components/HeaderLogout";
import { ip } from "../helperFunctions/accessToBackFunctions";
export default function SubscriptionPage({ navigation }) {
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
      fetch("http://" + ip + ":8001/user_subscription_maps/")
        .then((response) => response.json())
        .then((data) => {
          for (const index in data.result) {
            if (data.result[index].user_email === value) {
              setIsPremium(true);
              return;
            }
          }
          setIsPremium(false);
          return;
        })
        .catch((error) => {
          console.error(error);
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
