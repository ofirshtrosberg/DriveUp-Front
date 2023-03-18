import { Text, View, ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
export default function RegisterAsPassengerPage({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/register.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 3 }}>
        <TextInput
          mode="outlined"
          label="Email"
          style={{ marginBottom: 7, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          style={{ marginBottom: 7, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Phone Number"
          style={{ marginBottom: 7, marginHorizontal: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Full Name"
          style={{ marginBottom: 7, marginHorizontal: 20 }}
        />
        <Button
          mode="contained"
          buttonColor="#111"
          onPress={() => navigation.navigate("Login")}
          style={{ width: 150, alignSelf: "center", marginTop: 25 }}
        >
          Register
        </Button>
      </View>
    </ImageBackground>
  );
}
