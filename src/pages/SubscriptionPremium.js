import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Button } from "react-native-paper";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { useNavigation } from "@react-navigation/native";
import { deleteSubscription } from "../helperFunctions/accessToBackFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SubscriptionPremium() {
  const { userToken, login, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleCancelSubscription = async () => {
    try {
      const value = await AsyncStorage.getItem("currentUserEmail");
      if (value !== null && value !== "") {
        deleteSubscription(value, userToken, navigation, logout);
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
      <ImageBackground
        source={require("../assets/premiumNew.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          onPress={() => {handleCancelSubscription();}}
          style={{
            width: 200,
            height: 50,
            borderRadius: 20,
            overflow: "hidden",
            position: "absolute",
            bottom: 130,
            alignSelf: "center",
          }}
        >
          <ImageBackground
            source={require("../assets/btnOrder.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                lineHeight: 50,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Cancel subscription
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 400,
    width: 200,
    height: 50,
    alignSelf: "center",
    textAlign: "center",
  },
  textBtn: {
    fontSize: 17,
    marginTop: 100,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
