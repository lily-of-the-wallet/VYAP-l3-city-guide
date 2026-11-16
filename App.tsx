import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import SightDetailsScreen from "./screens/SightDetailsScreen";
import ReviewsScreen from "./screens/ReviewsScreen";
import SightsScreen from "./screens/SightsScreen";

export type RootStackParamList = {
    Login: undefined;
    Sights: undefined;
    SightDetails: { sightId: number };
    Reviews: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// подключает экраны приложения. настраивает переходы между ними
export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar style="dark" />
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Sights" component={SightsScreen} />
                    <Stack.Screen name="SightDetails" component={SightDetailsScreen} />
                    <Stack.Screen name="Reviews" component={ReviewsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
