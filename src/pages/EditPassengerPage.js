import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "react-native-paper";

export default function EditProfilePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit",
      // headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("alalal n");
  const [phoneNumber, setPhoneNumber] = useState("55555555");

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.photo}>
              <UserAvatar size={110} name={name} style={styles.avatar}>
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
          value={name}
          label="Name"
          style={styles.input}
          // onChangeText={}
        />
        <TextInput
          value={email}
          label="Email"
          style={styles.input}
          // onChangeText={}
        />
        <TextInput
          value={phoneNumber}
          label="Phone Number"
          style={styles.input}
          // onChangeText={}
        />
        <Button
          style={styles.save_btn}
          mode="contained"
          //   buttonColor="#91AEC4"
        >
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
});
