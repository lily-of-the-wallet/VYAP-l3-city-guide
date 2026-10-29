import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import SightDetailsScreen from "./screens/SightDetailsScreen";
import SightsScreen from "./screens/SightsScreen";

export type RootStackParamList = {
  Login: undefined;
  Sights: undefined;
  SightDetails: { sightId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Подключает экраны приложения. Настраивает переходы между ними.
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sights" component={SightsScreen} />
        <Stack.Screen name="SightDetails" component={SightDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
