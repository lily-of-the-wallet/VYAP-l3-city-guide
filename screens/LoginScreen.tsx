import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const openSights = () => navigation.navigate("Sights");

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoLetter}>G</Text>
        </View>
        <Text style={styles.heading}>Откройте город</Text>
        <Text style={styles.description}>
          Ваш спокойный гид по интересным местам и прогулкам.
        </Text>
        <View style={styles.form}>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#5A6472"
            style={styles.input}
          />
          <TextInput
            placeholder="Пароль"
            placeholderTextColor="#5A6472"
            secureTextEntry
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            onPress={openSights}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Войти</Text>
          </Pressable>
          <Pressable
            accessibilityRole="link"
            onPress={openSights}
            style={styles.guestLink}
          >
            <Text style={styles.guestLinkText}>Продолжить как гость</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
  },
  logo: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#4C6FFF",
  },
  logoLetter: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },
  heading: {
    marginTop: 40,
    color: "#14181F",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
  description: {
    marginTop: 14,
    color: "#5A6472",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  form: {
    marginTop: 64,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  input: {
    height: 56,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D5DAE2",
    borderRadius: 12,
    color: "#14181F",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  loginButton: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#4C6FFF",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  guestLink: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  guestLinkText: {
    color: "#4C6FFF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
});
