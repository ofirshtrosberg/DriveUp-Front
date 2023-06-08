import Icon from "react-native-vector-icons/FontAwesome5";
// import Icon from "react-native-vector-icons/Feather";

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { IP, PORT } from "@env";
import * as FileSystem from "expo-file-system";
import { downloadImage } from "../helperFunctions/accessToBackFunctions";
export default function DriverProfilePage(props) {
  const navigation = useNavigation();
  const {
    email,
    fullName,
    plateNumber,
    phoneNumber,
    carModel,
    password,
    carColor,
    forOrder,
    imageProfile,
  } = props;
  const [imageUri, setImageUri] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      if (imageProfile !== "" && imageProfile !== null)
        downloadImage(imageProfile, setImageUri);
      return () => {};
    }, [])
  );

  useEffect(() => {
    console.log("");
  }, [imageUri]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/profilePage.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatar} />
              ) : (
                <UserAvatar
                  size={110}
                  name={fullName}
                  style={styles.avatar}
                  textColor={"#061848"}
                />
              )}
            </TouchableOpacity>
            {forOrder === "false" && (
              <Icon
                name="edit"
                size={20}
                style={styles.edit_icon}
                onPress={() => {
                  navigation.navigate("EditDriver", {
                    fullName,
                    phoneNumber,
                    email,
                    carModel,
                    plateNumber,
                    password,
                    carColor,
                    imageProfile,
                    imageUri,
                  });
                }}
              ></Icon>
            )}
          </View>
          <Text style={styles.driver_name}>{fullName} </Text>
          <View style={styles.data_icons_Container}>
            <Icon
              name="envelope"
              size={30}
              color="#608cd7"
              style={styles.email_icon}
            />
            <Text style={styles.driver_email}>{email} </Text>
          </View>
          <View style={styles.data_icons_Container}>
            <Icon
              name="phone"
              size={20}
              color="#608cd7"
              style={styles.phone_icon}
            />
            <Text style={styles.driver_phone}>{phoneNumber} </Text>
          </View>

          <Text style={styles.driver_carModel}>My car : {carModel}</Text>
          <Text style={styles.driver_carModel}>Car Number: {plateNumber} </Text>
          {/* <Text style={styles.driver_plateNumber}>Car Number: {plateNumber} </Text> */}
          {/* <View style={styles.review_list}></View> */}
          <View>
            {forOrder === "false" && (
              <Button
                style={styles.sub_btn}
                mode="contained"
                buttonColor="#111"
                onPress={() => {
                  navigation.navigate("Subscription");
                }}
              >
                <Text style={styles.sub_text}>Subscription</Text>
              </Button>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginTop: 102.5,
    marginLeft: 9,
    backgroundColor: "white",
  },
  driver_name: {
    color: "white",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 50,
    width: 400,
    textAlign: "center",
    fontWeight: "600",
  },
  data_icons_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginRight: 30,
  },
  email_icon: { marginLeft: -10, marginRight: 20, color: "#76A6ED" },
  phone_icon: {
    transform: [{ rotate: "95deg" }],
    marginTop: -5,
    color: "#76A6ED",
  },
  driver_phone: {
    color: "white",
    fontSize: 20,
    marginLeft: 15,
    marginTop: 1,
    marginBottom: 5,
  },
  driver_email: {
    color: "white",
    fontSize: 20,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 7,
  },
  driver_carModel: {
    color: "white",
    fontSize: 20,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 10,
  },
  driver_plateNumber: {
    color: "black",
    fontSize: 20,
    marginLeft: 160,
    marginTop: 4,
    marginBottom: 10,
  },
  edit_icon: {
    padding: 5,
    marginLeft: 350,
    marginTop: -50,
    color: "#76A6ED",
  },
  sub_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
    width: "50%",
    backgroundColor: "#76A6ED",
    marginTop: 20,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  sub_text: { fontSize: 20, color: "#061848", fontWeight: "bold" },
});
