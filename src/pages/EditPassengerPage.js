import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "react-native-paper";
import CurrentUserContext from "../../CurrentUserContext";
import { updateUserLocal, printUsersLocal } from "../../AsyncStorageUsers";
import {
  validatePassword,
  validateFullName,
} from "../helperFunctions/validationFunctions.js";
import colors from "../config/colors.js";
import { IP } from "@env";
import { useNavigation } from "@react-navigation/native";

export default function EditProfilePage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
    });
  }, [navigation]);

  // const navigation = useNavigation();
  const { fullName, email } = route.params;

  const [editedName, setEditedName] = useState(fullName);
  // const [editedPassword, setEditedPassword] = useState(password);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = (email, editedName) => {
    setErrorMessage("");
    setSuccessMessage("");
    fetch("http://" + IP + ":8000/users/" + email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          email: email,
          full_name: editedName,
          // password: editedPassword,
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
        handleUpdateLocal(email, editedName);
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
      });
  };
  const handleUpdateLocal = async () => {
    const updatedUser = {
      email: email,
      full_name: editedName,
      // password: editedPassword,
    };
    await updateUserLocal(updatedUser);
    setSuccessMessage("Update successful!");
    printUsersLocal();
    console.log("User update successfully!");
    navigation.goBack();
  };
  const handleNameChange = (text) => {
    setEditedName(text);
  };

  // const handlePasswordChange = (text) => {
  //   setEditedPassword(text);
  // };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.photo}>
              <UserAvatar size={110} name={editedName} style={styles.avatar}>
                <View>
                  <Icon
                    name="camera"
                    size={35}
                    color="#91AEC4"
                    style={styles.camera}
                  />
                </View>
              </UserAvatar>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.user_details}>
        <TextInput
          value={editedName}
          mode="outlined"
          label="Name"
          style={styles.input}
          onChangeText={handleNameChange}
        />
        {/* <TextInput
          mode="outlined"
          value={editedPassword}
          label="Password"
          style={styles.input}
          onChangeText={handlePasswordChange}
        /> */}
        <Button
          style={styles.save_btn}
          mode="contained"
          onPress={() => {
            // if (!validatePassword(editedPassword)) {
            //   setErrorMessage("Invalid password");
            //   setSuccessMessage("");
            // } else
            if (!validateFullName(editedName)) {
              setErrorMessage("Invalid full name");
              setSuccessMessage("");
            } else {
              setSuccessMessage("");
              setErrorMessage("");
              handleUpdate(email, editedName);
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  photo: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 100,
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
  user_details: { marginTop: 100 },
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
