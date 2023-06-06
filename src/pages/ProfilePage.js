import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import DriverProfile from "./DriverProfilePage";
import PassengerProfile from "./PassengerProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getUserByEmail } from "../helperFunctions/accessToBackFunctions";
import { useEffect } from "react";
export default function ProfilePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);
  const { userToken, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [carColor, setCarColor] = useState("");
  const [imageProfile, setImageProfile] = useState("");

  const [user, setUser] = useState("");
  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem("currentUserEmail");
      if (value !== null && value !== "") {
        // !!!!! fetch from back
        const fetchedUser = await getUserByEmail(value, userToken, navigation);
        setEmail(value);
        setUser(fetchedUser);
        setFullName(fetchedUser.fullName);
        setPlateNumber(fetchedUser.plateNumber);
        setCarModel(fetchedUser.carModel);
        setPhoneNumber(fetchedUser.phoneNumber);
        setPassword(fetchedUser.password);
        setCarColor(fetchedUser.carColor);
        setImageProfile(fetchedUser.imageUrl);
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
      {plateNumber === "" ||
      plateNumber === null ||
      plateNumber === undefined ? (
        <PassengerProfile
          email={email}
          fullName={fullName}
          phoneNumber={phoneNumber}
          password={password}
          imageProfile={imageProfile}
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
          forOrder="false"
          imageProfile={imageProfile}
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
