import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPages from "./src/pages/MainPages";
import LoginPage from "./src/pages/LoginPage";
import theme from "./src/config/theme";
import { Provider as PaperProvider } from "react-native-paper";
import RegisterAsDriverPage from "./src/pages/RegisterAsDriverPage";
import RegisterAsPassengerPage from "./src/pages/RegisterAsPassengerPage";
import ProfilePage from "./src/pages/ProfilePage";
import SubscriptionPage from "./src/pages/SubscriptionPage";
import EditPassengerPage from "./src/pages/EditPassengerPage";
import EditDriverPage from "./src/pages/EditDriverPage";
import OrderDetailsPage from "./src/pages/OrderDetailsPage";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PassengerOrderOnMap from "./src/pages/PassengerOrderOnMap";
import PassengerOrderResult from "./src/pages/PassengerOrderResult";
import DriveOnMapDriverMode from "./src/pages/DriveOnMapDriverMode";
import { AuthProvider } from "./AuthContext";
import LandingPage from "./src/pages/LandingPage";
import FinishDriveScreen from "./src/pages/FinishDriveScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("currentUserEmail").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("currentUserEmail", "");
      }
    });
  }, []);
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#020C26" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen
              name="RegisterAsDriver"
              component={RegisterAsDriverPage}
            />
            <Stack.Screen
              name="RegisterPassenger"
              component={RegisterAsPassengerPage}
            />
            <Stack.Screen
              name="Main"
              component={MainPages}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Subscription" component={SubscriptionPage} />
            {/* <Stack.Screen name="Profile" component={ProfilePage} /> */}
            <Stack.Screen name="EditPassenger" component={EditPassengerPage} />
            <Stack.Screen name="EditDriver" component={EditDriverPage} />
            <Stack.Screen name="OrderDetails" component={OrderDetailsPage} />

            <Stack.Screen name="OrderOnMap" component={PassengerOrderOnMap} />
            <Stack.Screen name="OrderResult" component={PassengerOrderResult} />
            <Stack.Screen
              name="DriveDriverMode"
              component={DriveOnMapDriverMode}
            />
            <Stack.Screen name="FinishDrive" component={FinishDriveScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
