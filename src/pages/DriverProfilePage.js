import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriverProfilePage(props) {
  const navigation = useNavigation();
  const { email, fullName, plateNumber, phoneNumber, carModel } = props;

  return (
    <View style={styles.container}>
      <View style={styles.color}>
        <Text></Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <UserAvatar size={110} name={fullName} style={styles.avatar} />
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
            });
          }}
        ></Icon>
      </View>
      <Text style={styles.driver_name}>{fullName} </Text>
      <Text style={styles.driver_phone}>{phoneNumber} </Text>
      <Text style={styles.driver_email}>{email} </Text>
      <Text style={styles.driver_carModel}>My car : {carModel} </Text>
      <Text style={styles.driver_plateNumber}>Car Number: {plateNumber} </Text>
      <View style={styles.review_list}>
        <ScrollView>
          <Text>
            Haim: very good{"\n"}
            Eti: nice{"\n"}
            Shlomi:thank you!{"\n"}
          </Text>
        </ScrollView>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  color: {
    padding: 20,
    width: "100%",
    backgroundColor: "#5F84A2",
    height: 130,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: -70,
    backgroundColor: "#91AEC4",
  },
  driver_name: {
    color: "black",
    fontSize: 20,
    marginLeft: 0,
    marginTop: 20,
    width: 300,
    textAlign: "center",
  },
  driver_phone: {
    color: "black",
    fontSize: 20,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 10,
  },
  driver_carModel: {
    color: "black",
    fontSize: 20,
    marginRight: 200,
    marginTop: 4,
    marginBottom: 10,
  },
  driver_plateNumber: {
    color: "black",
    fontSize: 20,
    marginLeft: 150,
    marginTop: 4,
    marginBottom: 10,
  },
  edit_icon: {
    padding: 5,
    marginLeft: 350,
    marginTop: -50,
  },
  review_list: {
    backgroundColor: "#000",
    padding: 10,
    width: "80%",
    backgroundColor: "#5F84A2",
    height: 130,
    marginTop: 15,
    marginBottom: 15,
  },
});
