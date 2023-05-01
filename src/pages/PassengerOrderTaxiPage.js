import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { useState } from "react";
export default function PassengerOrderTaxiPage({ navigation }) {
  const [startAddress, setStartAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [checked, setChecked] = useState(false);
  const handleStartAddressChange = (text) => {
    setStartAddress(text);
  };
  const handleDestinationAddressChange = (text) => {
    setDestinationAddress(text);
  };
  const handleNumberOfPassengersChange = (text) => {
    setNumberOfPassengers(text);
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <TextInput
          mode="outlined"
          label="Start Address"
          style={styles.input}
          value={startAddress}
          onChangeText={handleStartAddressChange}
        />
        <TextInput
          mode="outlined"
          label="Destination Address"
          style={styles.input}
          value={destinationAddress}
          onChangeText={handleDestinationAddressChange}
        />
        <TextInput
          mode="outlined"
          label="Number of passengers"
          style={styles.input}
          value={numberOfPassengers}
          onChangeText={handleNumberOfPassengersChange}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text>Want to share a ride?</Text>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <Image style={styles.img} source={require("../assets/map.png")}></Image>
      </View>
      <Button
        mode="contained"
        buttonColor="#111"
        style={styles.inviteBtn}
        onPress={() => {}}
      >
        Invite now
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 7,
    marginHorizontal: 30,
  },
  inviteBtn: {
    marginHorizontal: 70,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
