import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SubscriptionBasic from "./SubscriptionBasic";
import SubscriptionPremium from "./SubscriptionPremium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { isUserPremium } from "../helperFunctions/accessToBackFunctions";
export default function SubscriptionPage() {
  const [isPremium, setIsPremium] = useState(false);
  const getCurrentSubscription = async () => {
    try {
      const value = await AsyncStorage.getItem("currentUserSubscription");
      if (value === "Basic") setIsPremium(false);
      else setIsPremium(true);
    } catch (error) {
      console.error("Error get user subscription:", error);
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
      {!isPremium && <SubscriptionBasic></SubscriptionBasic>}
      {isPremium && <SubscriptionPremium></SubscriptionPremium>}
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
