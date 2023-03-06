import * as React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/pages/HomePage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import OrderTaxiPage from "./src/pages/OrderTaxiPage";
import ProfilePage from "./src/pages/ProfilePage";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "OrderTaxi") {
              iconName = focused ? "ios-car-sport" : "ios-car-sport-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#5F84A2",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="OrderTaxi" component={OrderTaxiPage} />
        <Tab.Screen name="Home" component={HomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
