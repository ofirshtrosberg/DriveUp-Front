import React, { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput, Button } from "react-native-paper";
import {
  updateUserLocal,
  printUsersLocal,
  deleteUserLocal,
} from "../../AsyncStorageUsers";
import {
  validatePassword,
  validateFullName,
} from "../helperFunctions/validationFunctions.js";
import colors from "../config/colors.js";
import { IP, PORT } from "@env";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";

import * as ImagePicker from "expo-image-picker";
import { clearStackAndNavigate } from "../helperFunctions/accessToBackFunctions";
import { useFonts } from "expo-font";
import { Arima_700Bold } from "@expo-google-fonts/arima";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditProfilePage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
    });
  }, [navigation]);
  const { userToken, login, logout } = useContext(AuthContext);
  const { fullName, email, imageUri } = route.params;

  const [editedName, setEditedName] = useState(fullName);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newImageProfile, setNewImageProfile] = useState(imageUri);
  const [updateImageSuccess, setUpdateImageSuccess] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async (email, editedName) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    fetch("http://" + IP + ":" + PORT + "/users/update", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          email: email,
          full_name: editedName,
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
        if (updateImageSuccess === true || imageData === null) {
          clearStackAndNavigate(navigation, "Main");
          navigation.navigate("Profile");
        } else if (imageData !== null) {
          setErrorMessage("Try to save again");
        }
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };
  useEffect(() => {
    console.log("is loading changed");
  }, [isLoading]);
  useEffect(() => {
    console.log("image data changed");
  }, [imageData]);
  useEffect(() => {
    console.log("updateImageSuccess changed");
  }, [updateImageSuccess]);
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
      setImageData({ uri: imageUri, width: 50, height: 50 });
      uploadImage({ uri: imageUri, width: 50, height: 50 });
      setNewImageProfile(newImage.assets[0].uri);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!newImage.canceled) {
      setImageData(newImage.assets[0]);
      uploadImage(newImage.assets[0]);
      setNewImageProfile(newImage.assets[0].uri);
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
        clearStackAndNavigate(navigation, "Login");
        logout();
        console.error("your token expired or invalid please login");
        throw new Error("your token expired or invalid please login");
      }
      if (response.ok) {
        console.log("Image uploaded successfully!");
        setUpdateImageSuccess(true);
      } else {
        console.log("Failed to upload image.");
        setErrorMessage("Failed to upload image");
        setUpdateImageSuccess(false);
      }
    } catch (error) {
      console.log("Error occurred during image upload");
      setErrorMessage("Failed to upload image");
      setUpdateImageSuccess(false);
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
        if (response.status === 401) {
          clearStackAndNavigate(navigation, "Login");
          logout();
          console.error("your token expired or invalid please login");
          throw new Error("your token expired or invalid please login");
        }
        if (!response.ok) {
          throw new Error("Update failed");
        }
        setSuccessMessage("Image delete successfully!");
        setUpdateImageSuccess(true);
      })
      .then((data) => {
        setNewImageProfile("");
        setUpdateImageSuccess(true);
      })
      .catch((error) => {
        setErrorMessage("Update failed!");
        setErrorMessage("Failed to delete image");
        setUpdateImageSuccess(false);
      });
  };

  const [fontsLoaded] = useFonts({
    Arima_700Bold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={150}
    >
      <ImageBackground
        source={require("../assets/editPageNew.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
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
          <BottomSheet
            isVisible={isBottomSheetVisible}
            style={styles.bottomSheet}
            backdropStyle={[
              styles.backdropStyle,
              { backgroundColor: "rgba(0, 0, 0, 0.65)" },
            ]}
          >
            <Text style={styles.bottomSheetsTitle}>
              Choose Your Profile Picture
            </Text>
            <Button
              onPress={() => takePhoto()}
              style={styles.bottomSheetsButton}
            >
              <Text style={styles.bottomSheetsText}>Take a Photo</Text>
            </Button>
            <Button
              onPress={() => pickImage()}
              style={styles.bottomSheetsButton}
            >
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
            <View style={styles.data_icons_Container}>
              <FontAwesome name="user-o" size={24} style={styles.user_icon} />
              <TextInput
                value={editedName}
                mode="outlined"
                label="Name"
                style={styles.input}
                onChangeText={handleNameChange}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (!validateFullName(editedName)) {
                  setErrorMessage("Invalid full name");
                  setSuccessMessage("");
                } else {
                  setSuccessMessage("");
                  setErrorMessage("");
                  handleUpdate(email, editedName);
                }
              }}
              style={{
                width: 150,
                height: 50,
                borderRadius: 20,
                overflow: "hidden",
                alignSelf: "center",
              }}
            >
              <ImageBackground
                source={require("../assets/btnOrder.png")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    lineHeight: 50,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Save
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#76A6ED"
              style={{ marginTop: 75 }}
            />
          )}
          {errorMessage !== "" && (
            <Text style={styles.message}>{errorMessage}</Text>
          )}
          {successMessage !== "" && (
            <Text style={styles.message}>{successMessage}</Text>
          )}
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    // flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
  },
  contentContainer: {
    marginTop: 10,
  },
  photo: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: -75,
    marginLeft: 2,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 40,
    marginHorizontal: 20,
    width: 310,
    borderRadius: 15,
    fontSize: 20,
  },
  user_details: { marginTop: 100 },
  save_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 135,
    marginRight: 20,
    width: "35%",
    height: 50,
    marginTop: 50,
    backgroundColor: "#76A6ED",
  },
  save_text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    marginTop: 20,
    // marginBottom: 50,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  data_icons_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -15,
    marginBottom: 5,
    justifyContent: "center",
  },
  user_icon: { marginLeft: 10, color: "white", marginBottom: 30 },
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
    fontSize: 19,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  bottomSheetsTitle: {
    fontSize: 28,
    color: "#061848",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Arima_700Bold",
  },
  backdropStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
