import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const data = [
  { orderNumber: "12345", numberOfPassengers: 3, estimatedProfit: 35 },
  { orderNumber: "12346", numberOfPassengers: 4, estimatedProfit: 36 },
  { orderNumber: "12347", numberOfPassengers: 5, estimatedProfit: 40 },
];
export default function DriverRoutesOffersPage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View
          key={item.orderNumber}
          style={{
            borderBottomWidth: 1,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text style={{ marginBottom: 2 }}>
              Order number:{item.orderNumber}
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Number of passengers:{item.numberOfPassengers}
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Estimated Profit:{item.estimatedProfit}$
            </Text>
          </View>
          <View>
            <Button
              mode="contained"
              buttonColor="#111"
              style={styles.watchDetailsBtn}
              onPress={() => {
                navigation.navigate("DriveDriverMode")
              }}
            >
              Watch details
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watchDetailsBtn: {
    width: 150,
  },
});
