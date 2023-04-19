import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import DriverProfile from "./DriverProfilePage";
import PassengerProfile from "./PassengerProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getUserByEmail } from "../../AsyncStorageUsers";

export default function ProfilePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [carColor, setCarColor] = useState("");

  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem("currentUserEmail");
      if (value !== null && value !== "") {
        const fetchedUser = await getUserByEmail(value);
        setEmail(value);
        setUser(fetchedUser);
        setFullName(fetchedUser.full_name);
        setPlateNumber(fetchedUser.plate_number);
        setCarModel(fetchedUser.car_model);
        setPhoneNumber(fetchedUser.phone_number);
        setPassword(fetchedUser.password);
        setCarColor(fetchedUser.car_color)
      }
    } catch (error) {
      console.error("Error fetching user:", error);
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
      {plateNumber === "" ? (
        <PassengerProfile
          email={email}
          fullName={fullName}
          phoneNumber={phoneNumber}
          password={password}
        />
      ) : (
        <DriverProfile
          email={email}
          fullName={fullName}
          plateNumber={plateNumber}
          phoneNumber={phoneNumber}
          carModel={carModel}
          password={password}
          carColor={carColor}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
