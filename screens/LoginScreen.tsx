import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

type LoginValues = { email: string; password: string };

function validateLogin(values: LoginValues) {
  const errors: Partial<Record<keyof LoginValues, string>> = {};

  if (!values.email.trim()) {
    errors.email = "Введите e-mail";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Введите корректный e-mail";
  }

  if (!values.password) {
    errors.password = "Введите пароль";
  } else if (values.password.length < 8 || !/[a-zA-z]/.test(values.password)) {
    errors.password = "Пароль должен содержать не менее 8 символов и хотя бы одну цифру";
  }

  return errors;
}

export default function LoginScreen({ navigation }: Props) {
  const { login, logout } = useAuth();
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm<LoginValues>(
      { email: "", password: "" },
      validateLogin
  );

  function submitLogin() {
    handleSubmit((validValues) => {
      login(validValues.email.trim());
      resetForm();
      navigation.navigate("Sights");
    });
  }

  function continueAsGuest() {
    logout();
    resetForm();
    navigation.navigate("Sights");
  }

  return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.logo}>
            <Text style={styles.logoLetter}>G</Text>
          </View>
          <Text style={styles.heading}>Откройте город</Text>
          <Text style={styles.description}>
            Ваш спокойный гид по интересным местам и прогулкам.
          </Text>
          <View style={styles.form}>
            <FormField label="E-mail" error={errors.email}>
              <TextInput
                  accessibilityLabel="E-mail"
                  placeholder="E-mail"
                  placeholderTextColor="#5A6472"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={(text) => handleChange("email", text)}
                  style={styles.input}
              />
            </FormField>
            <FormField label="Пароль" error={errors.password}>
              <TextInput
                  accessibilityLabel="Пароль"
                  placeholder="Пароль"
                  placeholderTextColor="#5A6472"
                  secureTextEntry
                  value={values.password}
                  onChangeText={(text) => handleChange("password", text)}
                  style={styles.input}
              />
            </FormField>
            <Button onPress={submitLogin}>Войти</Button>
            <Button variant="secondary" onPress={continueAsGuest}>
              Продолжить как гость
            </Button>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
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
    marginTop: 32,
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
    marginTop: 32,
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
});
