import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
export default function SubscriptionBasic() {
  return (
    <View style={styles.container}>
      <Text>Subscription</Text>
      <Text>Your current Subscription:</Text>
      <Text>Basic</Text>
      <TextInput mode="outlined" label="Card owner id" style={styles.input} />
      <TextInput mode="outlined" label="Card number" style={styles.input} />
      <TextInput mode="outlined" label="CVV" style={styles.input} />
      <TextInput mode="outlined" label="Expiration date" style={styles.input} />
      <Button mode="contained" buttonColor="#111">
        Upgrade to premium
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
  input: {
    marginBottom: 7,
    marginHorizontal: 20,
    width: 250,
  },
});
