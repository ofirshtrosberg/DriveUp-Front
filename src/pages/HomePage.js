import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import colors from "../config/colors";
import HeaderLogout from "../components/HeaderLogout";
import { useNavigation } from '@react-navigation/native';


export default function HomePage() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => <HeaderLogout />

    });
  }, [navigation]);
  return (
    <View style={styles.pageContainer}>
      <Image style={styles.img} source={require("../assets/img1.png")}></Image>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>DriveUP</Text>
        <View style={styles.aboutContainer}>
          <Text numberOfLines={10}>
            About Us:{"\n\n"}DriveUp is a mobile app for ride sharing.{"\n"}
            On our app you can......
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.blue2,
  },
  title: {
    textAlign: "center",
    color: colors.blue3,
    fontSize: 30,
    backgroundColor: colors.blue1,
    width: "100%",
  },
  aboutContainer: {
    backgroundColor: colors.blue4,
    width: "80%",
    height: "80%",
    alignSelf: "center",
    top: 25,
    padding: 20,
  },
});
