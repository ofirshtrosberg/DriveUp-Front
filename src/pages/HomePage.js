import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import colors from "../config/colors";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
export default function HomePage() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerRight: () => <HeaderLogout />,
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={require("../assets/homePage.png")}
      ></ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    width: Dimensions.get("window").width,
    resizeMode: "cover",
  },
});
