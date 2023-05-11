import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import PassengerOrderTaxiPage from "./PassengerOrderTaxiPage";
import DriverRoutesOffersPage from "./DriverRoutesOffersScreen";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByEmail } from "../../AsyncStorageUsers";
import { useState } from "react";
export default function TaxiPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Order Taxi",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);

  const [plateNumber, setPlateNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem("currentUserEmail");
      if (value !== null && value !== "") {
        const fetchedUser = await getUserByEmail(value);
        setPlateNumber(fetchedUser.plate_number);
        setCurrentUserEmail(value);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      // setTimeout(() => {
      setIsLoading(false);
      // }, 3000);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : plateNumber === "" ? (
        <PassengerOrderTaxiPage currentUserEmail={currentUserEmail} />
      ) : (
        <DriverRoutesOffersPage />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loading: {
    alignSelf: "center",
  },
});
