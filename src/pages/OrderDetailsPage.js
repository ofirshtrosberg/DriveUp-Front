import React from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
export default function OrderDetailsPage() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Order Details",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Order Number:</Text>
      <Text>Sum:</Text>

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
