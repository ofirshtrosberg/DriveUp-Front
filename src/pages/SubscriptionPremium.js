import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { deleteSubscription } from "../helperFunctions/accessToBackFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SubscriptionPremium() {
  const navigation = useNavigation();
  const handleCancelSubscription =async () => {
     try {
       const value = await AsyncStorage.getItem("currentUserEmail");
       if (value !== null && value !== "") {
         await deleteSubscription(value);
         navigation.goBack();
       }
     } catch (error) {
       console.error("Error deleting subscription:", error);
     }
  };
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.text}>Your current Subscription:</Text>
      <Text style={styles.subscription}>Premium</Text>
      <Button
        style={styles.subscriptionBtn}
        mode="contained"
        buttonColor="#111"
        onPress={handleCancelSubscription}
      >
        Cancel subscription
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Lobster_400Regular",
    fontSize: 50,
    fontWeight: "normal",
  },
  text: {
    fontSize: 19,
  },
  subscription: {
    marginTop: 4,
    fontFamily: "Lobster_400Regular",
    fontSize: 30,
    fontWeight: "normal",
  },
  subscriptionBtn: {
    marginTop: 20,
  },
});
