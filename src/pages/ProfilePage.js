// import { Icon } from "@react-native-material/core";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import HeaderLogout from "../components/HeaderLogout";
// import { useNavigation } from '@react-navigation/native';

export default function ProfilePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => <HeaderLogout />

    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>ProfilePage</Text>
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
