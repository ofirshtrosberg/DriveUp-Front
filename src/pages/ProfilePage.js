// import { Icon } from "@react-native-material/core";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
// import Icon from "react-native-vector-icons/FontAwesome";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from '@react-navigation/native';


export default function ProfilePage() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile',
      headerRight: () => <HeaderLogout />

    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>ProfilePage</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logout_button: {
    alignSelf: "center",
  },
});
