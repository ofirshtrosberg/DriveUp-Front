import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
  const [cardType, setCardType] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expMonth, setExpMonth] = useState("01");
  const [expYear, setExpYear] = useState("");
  function handleUpgrade() {
    if (!validateId(ownerId)) {
      setError("Invalid owner id");
      return;
    }
    if (!validateCardNumber(cardType, cardNumber)) {
      console.log(cardType);
      setError("Invalid card number");
      return;
    }
    if (!validateCVV(cvv)) {
      setError("Invalid CVV");
      return;
    }
    setError("");
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
      <View style={{ backgroundColor: "#4343", borderRadius: 10 }}>
        <Picker
          selectedValue={cardType}
          onValueChange={(value, index) => setCardType(value)}
          style={{ width: 220 }}
        >
          <Picker.Item label="Visa" value="visa" />
          <Picker.Item label="MasterCard" value="masterCard" />
          <Picker.Item label="Discover" value="discover" />
          <Picker.Item label="Diners" value="diners" />
          <Picker.Item label="AmericanExpress" value="americanExpress" />
        </Picker>
      </View>
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          maxHeight: windowWidth / 5,
        }}
      >
        <View
          style={{ backgroundColor: "#4343", borderRadius: 10, marginRight: 3 }}
        >
          <Picker
            selectedValue={expMonth}
            onValueChange={(value, index) => setExpMonth(value)}
            style={{ width: 100 }}
          >
            <Picker.Item label="01" value="1" />
            <Picker.Item label="02" value="2" />
            <Picker.Item label="03" value="3" />
            <Picker.Item label="04" value="4" />
            <Picker.Item label="05" value="5" />
            <Picker.Item label="06" value="6" />
            <Picker.Item label="07" value="7" />
            <Picker.Item label="08" value="8" />
            <Picker.Item label="09" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
          </Picker>
        </View>
        <View style={{ backgroundColor: "#4343", borderRadius: 10 }}>
          <Picker
            selectedValue={expYear}
            onValueChange={(value, index) => setExpYear(value)}
            style={{ width: 150 }}
          >
            <Picker.Item label="2021" value="2021" />
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2026" value="2026" />
            <Picker.Item label="2027" value="2027" />
            <Picker.Item label="2028" value="2028" />
          </Picker>
        </View>
      </View>
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
    // marginTop: 20,
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
