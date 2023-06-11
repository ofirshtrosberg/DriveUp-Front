import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { IP, PORT } from "@env";
import { TextInput, Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { printUsersLocal } from "../../AsyncStorageUsers";
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
import { clearStackAndNavigate } from "../helperFunctions/accessToBackFunctions";

export default function EditDriverPage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
    });
  }, [navigation]);
  const { userToken, login, logout } = useContext(AuthContext);
  const { fullName, email, carModel, plateNumber, carColor, imageUri } =
    route.params;

  const [editedName, setEditedName] = useState(fullName);
  const [editedCarModel, setEditedCarModel] = useState(carModel);
  const [editedPlateNumber, setEditedPlateNumber] = useState(plateNumber);
  const [editedCarColor, setEditedCarColor] = useState(carColor);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newImageProfile, setNewImageProfile] = useState(imageUri);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (
    email,
    editedName,
    editedCarModel,
    editedCarColor,
    editedPlateNumber
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
          clearStackAndNavigate(navigation, "Login");
          logout();
          console.error("your token expired or invalid please login");
          throw new Error("your token expired or invalid please login");
        }
        if (!response.ok) {
          throw new Error("Update failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User update successfully!");
        clearStackAndNavigate(navigation, "Main");
        navigation.navigate("Profile");
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
      });
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
      const imageUri = newImage.assets[0].uri;
      uploadImage({ uri: imageUri, width: 50, height: 50 });
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
    }
  };
  const uploadImage = async (imageData) => {
    setIsLoading(true);
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
        clearStackAndNavigate(navigation, "Login");
        logout();
        console.error("your token expired or invalid please login");
        throw new Error("your token expired or invalid please login");
      }
      if (response.ok) {
        console.log("Image uploaded successfully!");
        printUsersLocal();
      } else {
        console.log("Failed to upload image.");
      }
    } catch (error) {
      console.log("Error occurred during image upload");
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
        if (!response.ok) {
          throw new Error("Update failed");
        }
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/editDriver.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
              {newImageProfile ? (
                <Image
                  source={{ uri: newImageProfile }}
                  style={styles.profileImage}
                />
              ) : (
                <UserAvatar
                  size={130}
                  name={editedName}
                  style={styles.profileImage}
                  textColor={"#061848"}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          isVisible={isBottomSheetVisible}
          style={styles.bottomSheet}
          backdropStyle={[
            styles.backdropStyle,
            { backgroundColor: "rgba(0, 0, 0, 0.65)" },
          ]}
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
            onPress={() => {
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
                );
              }
            }}
          >
            <Text style={styles.save_text}>SAVE</Text>
          </Button>
          {errorMessage !== "" && (
            <Text style={styles.message}>{errorMessage}</Text>
          )}
          {successMessage !== "" && (
            <Text style={styles.message}>{successMessage}</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: { alignItems: "center", flex: 1, justifyContent: "center" },
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    width: 360,
    borderRadius: 15,
    fontSize: 20,
  },
  user_details: { marginTop: 35 },
  save_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 132,
    marginRight: 20,
    width: "35%",
    marginTop: 50,
  },
  save_text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  message: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  button: {
    margin: 10,
    backgroundColor: "black",
    fontSize: 50,
  },
  bottomSheet: {
    backgroundColor: "rgba(118, 166, 237, 0.9)",
    height: 320,
    marginTop: 355,
    borderRadius: 20,
  },
  bottomSheetsButton: {
    margin: 10,
    backgroundColor: "#061848",
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
    color: "#061848",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "bold",
  },
  backdropStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  profileImage: {
    width: 145,
    height: 145,
    borderRadius: 100,
    marginTop: 18,
    marginLeft: 2,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
