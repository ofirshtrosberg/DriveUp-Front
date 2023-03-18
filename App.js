import { I18nManager } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPages from "./src/pages/MainPages";
import LoginPage from "./src/pages/LoginPage";
import theme from "./src/config/theme";
import { Provider as PaperProvider } from "react-native-paper";
import RegisterAsDriverPage from "./src/pages/RegisterAsDriverPage";
import RegisterAsPassengerPage from "./src/pages/RegisterAsPassengerPage";
const Stack = createNativeStackNavigator();

export default function App() {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
