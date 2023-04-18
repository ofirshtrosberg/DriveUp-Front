import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { TextInput, Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { updateUserLocal, printUsersLocal } from "../../AsyncStorageUsers";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditDriverPage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
      //   headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);

  const { fullName, phoneNumber, email, carModel, plateNumber } = route.params;

  // edited params
  const [editedName, setEditedName] = useState(fullName);
  const [editedPhone, setEditedPhone] = useState(phoneNumber);
  const [editedCarModel, setEditedCarModel] = useState(carModel);
  const [editedPlateNumber, setEditedPlateNumber] = useState(plateNumber);
  const [editedEmail, setEditedEmail] = useState(email);

  console.log(editedName);
  const handleNameChange = (text) => {
    setEditedName(text);
  };

  const handlePhoneChange = (text) => {
    setEditedPhone(text);
  };
  const handleEmailChange = (text) => {
    setEditedEmail(text);
  };

  const handleCarModelChange = (text) => {
    setEditedCarModel(text);
  };

  const handlePlateNumberChange = (text) => {
    setEditedPlateNumber(text);
  };

  const handleUpdate = async () => {
    const updatedUser = {
      email: email,
      phone_number: editedPhone,
      full_name: editedName,
      car_model: editedCarModel,
      // car_color: carColor,
      plate_number: editedPlateNumber,
    };
    await updateUserLocal(updatedUser);
    await printUsersLocal();
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <TouchableOpacity onPress={() => {}}>
          {/* <View style={styles.photo}> */}
          <UserAvatar size={110} name={editedName} style={styles.avatar}>
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
          value={editedName}
          mode="outlined"
          label="Name"
          style={styles.input}
          onChangeText={handleNameChange}
        />
        <TextInput
          mode="outlined"
          value={editedPhone}
          label="Phone Number"
          style={styles.input}
          onChangeText={handlePhoneChange}
        />
        <TextInput
          mode="outlined"
          value={editedEmail}
          label="Email"
          style={styles.input}
          onChangeText={handleEmailChange}
        />
        <TextInput
          mode="outlined"
          value={editedCarModel}
          label="Car Model"
          style={styles.input}
          onChangeText={handleCarModelChange}
        />
        <TextInput
          mode="outlined"
          value={editedPlateNumber}
          label="Car Number"
          style={styles.input}
          onChangeText={handlePlateNumberChange}
        />
        <Button style={styles.save_btn} mode="contained" onPress={handleUpdate}>
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
