import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { ip } from "../helperFunctions/accessToBackFunctions.js";
import { TextInput, Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { updateUserLocal, printUsersLocal } from "../../AsyncStorageUsers";
import colors from "../config/colors.js";
import { ScrollView } from "react-native-gesture-handler";
import {
  validatePassword,
  validateFullName,
  validateCarModel,
  validateCarColor,
  validatePlateNumber,
} from "../helperFunctions/validationFunctions.js";

export default function EditDriverPage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
    });
  }, [navigation]);

  const { fullName, email, carModel, plateNumber, password, carColor } =
    route.params;

  const [editedName, setEditedName] = useState(fullName);
  const [editedCarModel, setEditedCarModel] = useState(carModel);
  const [editedPlateNumber, setEditedPlateNumber] = useState(plateNumber);
  const [editedPassword, setEditedPassword] = useState(password);
  const [editedCarColor, setEditedCarColor] = useState(carColor);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = (
    email,
    editedName,
    editedCarModel,
    editedCarColor,
    editedPlateNumber,
    editedPassword
  ) => {
    fetch("http://" + ip + ":8000/users/" + email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          email: email,
          full_name: editedName,
          car_model: editedCarModel,
          car_color: editedCarColor,
          plate_number: editedPlateNumber,
          password: editedPassword,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Update failed");
        }
        response.json();
      })
      .then((data) => {
        handleUpdateLocal(
          email,
          editedName,
          editedCarModel,
          editedCarColor,
          editedPlateNumber,
          editedPassword
        );
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
      });
  };
  const handleUpdateLocal = async () => {
    const updatedUser = {
      email: email,
      full_name: editedName,
      car_model: editedCarModel,
      car_color: carColor,
      plate_number: editedPlateNumber,
      password: editedPassword,
    };
    await updateUserLocal(updatedUser);
    setSuccessMessage("Update successful!");
    console.log("User update successfully!");
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };

  const handleCarModelChange = (text) => {
    setEditedCarModel(text);
  };

  const handlePlateNumberChange = (text) => {
    setEditedPlateNumber(text);
  };

  const handlePasswordChange = (text) => {
    setEditedPassword(text);
  };

  const handleCarColorChange = (text) => {
    setEditedCarColor(text);
  };

  return (
    <ScrollView>
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
          value={editedPassword}
          label="Password"
          style={styles.input}
          onChangeText={handlePasswordChange}
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
          value={editedCarColor}
          label="Car Color"
          style={styles.input}
          onChangeText={handleCarColorChange}
        />
        <TextInput
          mode="outlined"
          value={editedPlateNumber}
          label="Car Number"
          style={styles.input}
          onChangeText={handlePlateNumberChange}
        />
        <Button
          style={styles.save_btn}
          mode="contained"
          onPress={() => {
            if (!validatePassword(editedPassword)) {
              setErrorMessage("Invalid password");
            } else if (!validateFullName(editedName)) {
              setErrorMessage("Invalid full name");
            } else if (!validateCarModel(editedCarModel)) {
              setErrorMessage("Invalid car model");
            } else if (!validateCarColor(carColor)) {
              setErrorMessage("Invalid car color");
            } else if (!validatePlateNumber(editedPlateNumber)) {
              setErrorMessage("Invalid plate number");
            } else {
              setErrorMessage("");
              handleUpdate(
                email,
                editedName,
                editedCarModel,
                editedCarColor,
                editedPlateNumber,
                editedPassword
              );
            }
          }}
        >
          Save
        </Button>
        {errorMessage !== "" && (
          <Text style={styles.message}>{errorMessage}</Text>
        )}
        {successMessage !== "" && (
          <Text style={styles.message}>{successMessage}</Text>
        )}
      </View>
    </ScrollView>
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
  message: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.blue1,
  },
});
