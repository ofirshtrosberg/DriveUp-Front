import React, {useState} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function SubscriptionBasic() {
  const [error, estError] = useState("");
  return (
    <View style={styles.container}>
      <Text>Subscription</Text>
      <Text>Your current Subscription:</Text>
      <Text>Basic</Text>
      <TextInput mode="outlined" label="Card owner id" style={styles.input} />
      <TextInput mode="outlined" label="Card number" style={styles.input} />
      <TextInput mode="outlined" label="CVV" style={styles.input} />
      <TextInput mode="outlined" label="Expiration date" style={styles.input} />
      <Button style={styles.upgradeBtn} mode="contained" buttonColor="#111">
        Upgrade to premium
      </Button>
      <Text style={styles.errorText}>{error}</Text>
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
    width: (4 / 5) * windowWidth,
  },
  upgradeBtn: {
    marginTop: 20,
    // width: (2 / 3) * windowWidth,
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.blue1,
  },
});
