import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import DriverProfile from "./DriverProfilePage";
import PassengerProfile from "./PassengerProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentUserContext from "../../CurrentUserContext";
import { useFocusEffect } from "@react-navigation/native";
import { getUserByEmail } from "../../AsyncStorageUsers";

const isDriver = true;

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
  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem('currentUserEmail');
      if (value !== null && value !== '') {
        const fetchedUser = await getUserByEmail(value);
        setEmail(value);
        setUser(fetchedUser);
        setFullName(fetchedUser.full_name);
        setPlateNumber(fetchedUser.plate_number);
        setCarModel(fetchedUser.car_model);
        setPhoneNumber(fetchedUser.phone_number);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
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
      {/* {carNumber === "" ? <PassengerProfile /> : <DriverProfile />} */}
      {isDriver && (
        <DriverProfile
          email={email}
          fullName={fullName}
          plateNumber={plateNumber}
          phoneNumber={phoneNumber}
          carModel={carModel}
        />
      )}
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
