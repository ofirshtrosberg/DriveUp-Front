import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import colors from "../config/colors";
import {
  validateCardNumber,
  validateCVV,
  validateId,
} from "../helperFunctions/validationFunctions";
const windowWidth = Dimensions.get("window").width;
export default function SubscriptionBasic() {
  const [error, setError] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  function handleUpgrade() {
    if (!validateId(ownerId)) {
      setError("Invalid owner id");
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setError("Invalid card number");
      return;
    }
    if (!validateCVV(cvv)) {
      setError("Invalid CVV");
      return;
    }
    //access to back
  }
  const handleIdChange = (text) => {
    setOwnerId(text);
  };
  const handleCardNumberChange = (text) => {
    setCardNumber(text);
  };
  const handleCvvChange = (text) => {
    setCvv(text);
  };
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.text}>Your current Subscription:</Text>
      <Text style={styles.subscription}>Basic</Text>
      <TextInput
        mode="outlined"
        label="Card owner id"
        style={styles.input}
        onChangeText={handleIdChange}
      />
      <TextInput
        mode="outlined"
        label="Card number"
        style={styles.input}
        onChangeText={handleCardNumberChange}
      />
      <TextInput
        mode="outlined"
        label="CVV"
        style={styles.input}
        onChangeText={handleCvvChange}
      />
      {/* <TextInput mode="outlined" label="Expiration date" style={styles.input} /> */}
      <Button
        style={styles.upgradeBtn}
        mode="contained"
        buttonColor="#111"
        onPress={() => handleUpgrade()}
      >
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
  title: {
    fontFamily: "Lobster_400Regular",
    fontSize: 50,
    fontWeight: "normal",
  },
  text: {
    fontSize: 19,
  },
  subscription: {
    marginTop: 4,
    fontFamily: "Lobster_400Regular",
    fontSize: 30,
    fontWeight: "normal",
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
