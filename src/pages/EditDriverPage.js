import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { TextInput, Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditDriverPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
      //   headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);

  const [carModel, setCarModel] = useState("fiat");
  const [carNumber, setCarNumber] = useState("1111");
  const [name, setName] = useState("jn j");
  const [phoneNumber, setPhoneNumber] = useState("123456789");

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <TouchableOpacity onPress={() => {}}>
          {/* <View style={styles.photo}> */}
          <UserAvatar size={110} name={name} style={styles.avatar}>
            {/* <View>
                <Icon
                  name="camera"
                  size={35}
                  color="#91AEC4"
                  style={styles.camera}
                />
              </View> */}
          </UserAvatar>
          {/* </View> */}
        </TouchableOpacity>
      </View>
      <View style={styles.user_details}>
        <TextInput
          value={name}
          mode="outlined"
          label="Name"
          style={styles.input}
          // onChangeText={}
        />
        <TextInput
          mode="outlined"
          value={phoneNumber}
          label="Phone Number"
          style={styles.input}
          // onChangeText={}
        />
        <TextInput
          mode="outlined"
          value={carModel}
          label="Car Model"
          style={styles.input}
          // onChangeText={}
        />
        <TextInput
          mode="outlined"
          value={carNumber}
          label="Car Number"
          style={styles.input}
          // onChangeText={}
        />
        <Button style={styles.save_btn} mode="contained">
          Save
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  containerTop: { alignItems: "center", flex: 1, justifyContent: "center" },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: "#91AEC4",
  },
  camera: {
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
  },
  user_details: { flex: 2 },
  save_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
    marginRight: 20,
    width: "50%",
    marginTop: 15,
  },
});
