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
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("currentUserEmail").then((value) => {
        if (value != "") {
          const fetchUser = async () => {
            try {
              const fetchedUser = await getUserByEmail(value);
              setEmail(value);
              setUser(fetchedUser);
              setFullName(user.full_name);
              setPlateNumber(user.plate_number);
              setCarModel(user.car_model);
              setPhoneNumber(user.phone_number);
            } catch (error) {
              console.error("Error fetching user:", error);
            }
          };
          fetchUser();
        }
      });
      return () => {};
    }, [])
  );
  // const [email, setEmail] = useState("");
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   AsyncStorage.getItem("currentUserEmail").then((value) => {
  //     setEmail(value);
  //     console.log(email);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (email != "") {
  //     const fetchUser = async () => {
  //       try {
  //         const fetchedUser = await getUserByEmail(email);
  //         setUser(fetchedUser);
  //       } catch (error) {
  //         console.error("Error fetching user:", error);
  //       }
  //     };
  //     fetchUser();
  //   }
  // }, [email]);
  // const carNumber = user.plateNumber;

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
