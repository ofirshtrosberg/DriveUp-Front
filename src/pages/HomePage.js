import React from "react";
import { Text, View, Button } from "react-native";
import { useEffect } from "react";
const ip = "10.100.102.101"; // wifi IPv4: find by using ipconfig on cmd (windows)
const getUsers = () => {
  // fetch("http://" + ip + ":8000/users/")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

export default function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!!!!!!</Text>
      <Button
        onPress={getUsers}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
