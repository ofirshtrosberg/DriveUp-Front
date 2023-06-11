import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomePage from "./HomePage";
import TaxiPage from "./TaxiPage";
import ProfilePage from "./ProfilePage";
import { ImageBackground, Dimensions, View } from "react-native";

export default function MainPages() {
  const { width, height } = Dimensions.get("window");
  const Tab = createBottomTabNavigator();
  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "TaxiPage") {
              iconName = focused ? "ios-car-sport" : "ios-car-sport-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#061848",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
          },
          tabBarBackground: () => (
            <ImageBackground
              source={require("../assets/linearBluePurple.png")}
              style={{ flex: 1, resizeMode: "cover" }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            headerStyle: { backgroundColor: "#020C26" },
            headerTintColor: "white",
          }}
        />
        <Tab.Screen
          name="TaxiPage"
          component={TaxiPage}
          options={{
            headerStyle: { backgroundColor: "#020C26" },
            headerTintColor: "white",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            headerStyle: { backgroundColor: "#020C26" },
            headerTintColor: "white",
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
