import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "SightDetails">;

export default function SightDetailsScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image
          source={require("../assets/town-hall.png")}
          resizeMode="cover"
          style={styles.heroImage}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </Pressable>

        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Старая ратуша</Text>
          <Text style={styles.heroCategory}>
            Архитектура · исторический центр
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Здание конца XIX века с часовой башней - одна из самых узнаваемых
          точек города.
        </Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Адрес</Text>
          <Text style={styles.value}>пл. Победы, 1</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Время работы</Text>
          <Text style={styles.value}>ежедневно, 10:00–19:00</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Полезно знать</Text>
          <Text style={styles.value}>
            Лучшее время для фото - утро в будние дни.
          </Text>
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
  hero: {
    height: 280,
    justifyContent: "space-between",
    paddingTop: 24,
    overflow: "hidden",
  },
  heroImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backButton: {
    width: 88,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  backButtonText: {
    color: "#14181F",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
  },
  heroOverlay: {
    height: 112,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(20, 24, 31, 0.55)",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },
  heroCategory: {
    marginTop: 8,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  description: {
    color: "#14181F",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24,
  },
  infoBlock: {
    marginTop: 16,
  },
  label: {
    color: "#5A6472",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16,
  },
  value: {
    marginTop: 4,
    color: "#14181F",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
});
