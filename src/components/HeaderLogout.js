import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Header = ({ title }) => {
  const { userToken, login, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout = async () => {
    AsyncStorage.setItem("currentUserEmail", "");
    logout();
    navigation.navigate("Landing");
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="sign-out" size={30} color="#4682b4" />
      </TouchableOpacity>
    </View>
  );


};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Header;
