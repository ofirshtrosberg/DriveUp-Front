import React, {useContext} from "react";
import { AuthContext } from "../../AuthContext";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Header = ({ title }) => {
  const { userToken, login, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout =async () => {
    AsyncStorage.setItem("currentUserEmail", "");
    // await AsyncStorage.setItem("userToken", "");
    logout();
    navigation.navigate("Login");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        height: 60,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="sign-out" size={30} color="#4682b4" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
