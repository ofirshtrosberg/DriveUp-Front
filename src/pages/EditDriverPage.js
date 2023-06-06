import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { View, TouchableOpacity, StyleSheet, Text, Image,ImageBackground } from "react-native";
import { IP, PORT } from "@env";
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
import { BottomSheet } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function EditDriverPage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
    });
  }, [navigation]);
  const { userToken, login, logout } = useContext(AuthContext);
  const { fullName, email, carModel, plateNumber, carColor, imageProfile } =
    route.params;

  const [editedName, setEditedName] = useState(fullName);
  const [editedCarModel, setEditedCarModel] = useState(carModel);
  const [editedPlateNumber, setEditedPlateNumber] = useState(plateNumber);
  // const [editedPassword, setEditedPassword] = useState(password);
  const [editedCarColor, setEditedCarColor] = useState(carColor);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newImageProfile, setNewImageProfile] = useState(imageProfile);
  const handleUpdate = (
    email,
    editedName,
    editedCarModel,
    editedCarColor,
    editedPlateNumber
    // editedPassword
  ) => {
    setSuccessMessage("");
    setErrorMessage("");
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
          car_model: editedCarModel,
          car_color: editedCarColor,
          plate_number: editedPlateNumber,
        },
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
        if (!response.ok) {
          throw new Error("Update failed");
        }
        return response.json();
      })
      .then((data) => {
        handleUpdateLocal(
          email,
          editedName,
          editedCarModel,
          editedCarColor,
          editedPlateNumber
          // editedPassword
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
      image_url: newImageProfile,
      // password: editedPassword,
    };
    await updateUserLocal(updatedUser);
    printUsersLocal();
    //     ge("Update successful!");
    // console.log("User update successfully!");
    console.log("User update successfully!");
    navigation.goBack();
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

  // const handlePasswordChange = (text) => {
  //   setEditedPassword(text);
  // };

  const handleCarColorChange = (text) => {
    setEditedCarColor(text);
  };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };
  const takePhoto = async () => {
    handleCloseBottomSheet();
    const newImage = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!newImage.canceled) {
      const imageUri = newImage.assets[0].uri; // Access the selected image URI
      const { width, height } = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            crop: getCircularCrop(
              newImage.assets[0].width,
              newImage.assets[0].height
            ),
          },
        ],
        { format: "png" }
      );

      uploadImage({ uri: imageUri, width, height });
      setNewImageProfile(imageUri);
    }
  };

  const pickImage = async () => {
    handleCloseBottomSheet();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied!");
      return;
    }

    const newImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      cropperCircleOverlay: true,
    });

    if (!newImage.canceled) {
      uploadImage(newImage.assets[0]);
      setNewImageProfile(newImage.assets[0].uri);
      // console.log("dddddddd", newImage);
    }
  };
  const uploadImage = async (imageData) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageData.uri,
      name: "image.jpg",
      type: "image/jpg",
    });
    try {
      const response = await fetch(
        "http://" + IP + ":" + PORT + "/images/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 401) {
        navigation.navigate("Login");
        throw new Error("your token expired or invalid please login");
      }
      if (response.ok) {
        console.log("Image uploaded successfully! Response:", response);
        printUsersLocal();
      } else {
        console.log("Failed to upload image. Response:", response);
      }
    } catch (error) {
      console.log("Error occurred during image upload:", error);
    }
  };

  const deleteProfileImage = () => {
    handleCloseBottomSheet();
    fetch("http://" + IP + ":" + PORT + "/images/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Update failed");
        }
        console.log(response);
        setSuccessMessage("Image delete successfully!");
      })
      .then((data) => {
        setNewImageProfile("");
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
      });
  };
  return (
    <ScrollView>
      <View style={styles.containerTop}>
        <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
          {newImageProfile ? (
            <Image
              source={{ uri: newImageProfile }}
              style={styles.profileImage}
            />
          ) : (
            <UserAvatar
              size={110}
              name={editedName}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
      </View>
      <BottomSheet
        isVisible={isBottomSheetVisible}
        style={styles.bottomSheet}
        backdropStyle={styles.backdropStyle}
      >
        <Text style={styles.bottomSheetsTitle}>
          Choose Youe Profile Picture
        </Text>
        <Button onPress={() => takePhoto()} style={styles.bottomSheetsButton}>
          <Text style={styles.bottomSheetsText}>Take a Photo</Text>
        </Button>
        <Button onPress={() => pickImage()} style={styles.bottomSheetsButton}>
          <Text style={styles.bottomSheetsText}>Choose From Gallery</Text>
        </Button>
        <Button
          onPress={() => deleteProfileImage()}
          style={styles.bottomSheetsButton}
        >
          <Text style={styles.bottomSheetsText}>Delete Image</Text>
        </Button>
        <Button
          onPress={() => handleCloseBottomSheet(true)}
          style={styles.bottomSheetsButton}
        >
          <Text style={styles.bottomSheetsText}>CANCEL</Text>
        </Button>
      </BottomSheet>
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
            // if (!validatePassword(editedPassword)) {
            //   setErrorMessage("Invalid password");
            //   setSuccessMessage("");
            // } else
            if (!validateFullName(editedName)) {
              setErrorMessage("Invalid full name");
              setSuccessMessage("");
            } else if (!validateCarModel(editedCarModel)) {
              setErrorMessage("Invalid car model");
              setSuccessMessage("");
            } else if (!validateCarColor(carColor)) {
              setErrorMessage("Invalid car color");
              setSuccessMessage("");
            } else if (!validatePlateNumber(editedPlateNumber)) {
              setErrorMessage("Invalid plate number");
              setSuccessMessage("");
            } else {
              setSuccessMessage("");
              setErrorMessage("");
              handleUpdate(
                email,
                editedName,
                editedCarModel,
                editedCarColor,
                editedPlateNumber
                // editedPassword
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
  user_details: { flex: 2, marginTop: 20 },
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
  button: {
    margin: 10,
    backgroundColor: "black",
    fontSize: 50,
  },
  bottomSheet: {
    backgroundColor: "#B5B6D8",
    height: 320,
    // justifyContent: "space-around",
    marginTop: 355,
    borderRadius: 20,
  },
  bottomSheetsButton: {
    margin: 10,
    backgroundColor: "#7F7EB4",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 40,
    backgroundColor: "#91AEC4",
  },
});
