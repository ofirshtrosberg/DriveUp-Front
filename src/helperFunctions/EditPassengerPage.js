import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput, Button } from "react-native-paper";
import { updateUserLocal, printUsersLocal } from "../../AsyncStorageUsers";
import { validateFullName, validatePassword } from "./validationFunctions";
import colors from "../config/colors.js";
import { IP, PORT } from "@env";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheet } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { clearStackAndNavigate } from "./accessToBackFunctions";

export default function EditProfilePage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
    });
  }, [navigation]);
  const { userToken, login, logout } = useContext(AuthContext);
  const { fullName, email } = route.params;

  const [editedName, setEditedName] = useState(fullName);
  // const [editedPassword, setEditedPassword] = useState(password);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState(null);
  const handleUpdate = (email, editedName) => {
    setErrorMessage("");
    setSuccessMessage("");
    fetch("http://" + IP + ":" + PORT + "/users/update/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userToken}`,
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
        if (response.status === 401) {
          clearStackAndNavigate(navigation, "Login");
          logout();
          throw new Error("your token expired or invalid please login");
        }
        if (!response.ok) {
          throw new Error("Update failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User update successfully!");
        navigation.goBack();
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
      });
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };

  // const handlePasswordChange = (text) => {
  //   setEditedPassword(text);
  // };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  // const handleImageChange = (image) => {
  //   setImage(image);
  // };

  async function takePhoto() {
    handleCloseBottomSheet();
    let newImage = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!newImage.canceled) {
      if (newImage.assets && newImage.assets.length > 0) {
        setImage(newImage.assets[0].uri);
      } else {
        setImage(newImage.uri);
      }
    }
  }

  async function pickImage() {
    handleCloseBottomSheet();

    let newImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!newImage.canceled) {
      if (newImage.assets && newImage.assets.length > 0) {
        setImage(newImage.assets[0].uri);
      } else {
        setImage(newImage.uri);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <UserAvatar
                size={110}
                name={editedName}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        isVisible={isBottomSheetVisible}
        style={styles.bottomSheet}
        backdropStyle={styles.backdropStyle}
      >
        <Text style={styles.bottomSheetsTitle}>
          Choose Youe Profile Picture
        </Text>
        {/* <TouchableOpacity
          style={styles.bottomSheetsButton}
          onPress={() => takePhoto()}
        >
          <Text style={styles.bottomSheetsText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomSheetsButton}
          onPress={() => pickImage()}
        >
          <Text style={styles.bottomSheetsText}>Choose From Gallery</Text>
        </TouchableOpacity> */}
        {/* 
        <TouchableOpacity
          style={styles.bottomSheetsButton}
          onPress={() => handleCloseBottomSheet()}
        >
          <Text style={styles.bottomSheetsText}>CLOSE</Text>
        </TouchableOpacity> */}
        <Button onPress={() => takePhoto()} style={styles.bottomSheetsButton}>
          <Text style={styles.bottomSheetsText}>Take a Photo</Text>
        </Button>
        <Button onPress={() => pickImage()} style={styles.bottomSheetsButton}>
          <Text style={styles.bottomSheetsText}>Choose From Gallery</Text>
        </Button>
        <Button
          onPress={() => handleCloseBottomSheet(true)}
          style={styles.bottomSheetsButton}
        >
          <Text style={styles.bottomSheetsText}>CANCEL</Text>
        </Button>
      </BottomSheet>
      <View style={styles.user_details}>
        <View style={styles.data_icons_Container}>
          <FontAwesome name="user-o" size={20} style={styles.user_icon} />
          <TextInput
            value={editedName}
            mode="outlined"
            label="Name"
            style={styles.input}
            onChangeText={handleNameChange}
          />
        </View>
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
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 70,
    backgroundColor: "#91AEC4",
  },
  camera: {
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    marginTop: -10,
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    width: 340,
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
  data_icons_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -15,
    marginBottom: 10,
  },
  user_icon: { marginLeft: 10 },
  bottomSheet: {
    backgroundColor: "rgba(92, 162, 176, 0.6)",
    height: 320,
    // justifyContent: "space-around",
    marginTop: 355,
    borderRadius: 20,
  },
  bottomSheetsButton: {
    margin: 10,
    backgroundColor: "grey",
    fontSize: 50,
    borderRadius: 20,
  },
  bottomSheetsText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  bottomSheetsTitle: {
    fontSize: 23,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "bold",
  },
  backdropStyle: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
});
