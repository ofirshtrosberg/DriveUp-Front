// import { Icon } from "@react-native-material/core";
import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import HeaderLogout from "../components/HeaderLogout";
// import { useNavigation } from '@react-navigation/native';
// import { currentEmail } from "../../CurrentConnectedUserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentUserContext from "../../CurrentUserContext";
export default function ProfilePage({ navigation }) {
  const { currentUserEmail, setCurrentUserEmail } =
    useContext(CurrentUserContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>ProfilePage</Text>
      <Text>{currentUserEmail}</Text>
      <Button
        mode="contained"
        buttonColor="#111"
        onPress={() => {
          navigation.navigate("Subscription");
        }}
      >
        Subscription
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
