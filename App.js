import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, Button } from "react-native-paper";
import { theme } from "./src/core/theme";

export default function App() {
  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <Text>
          hiiiii!!!
        </Text>
        <Button>click!</Button>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colors.border,
    alignItems: "center",
    justifyContent: "center"
  }
});
