import React from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from '@react-navigation/native';
export default function OrderTaxiPage() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Order Taxi',
      headerRight: () => <HeaderLogout />

    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>OrderTaxiPage!</Text>
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