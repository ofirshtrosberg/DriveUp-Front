// import { Icon } from "@react-native-material/core";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function ProfilePage({ navigation }) {
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
