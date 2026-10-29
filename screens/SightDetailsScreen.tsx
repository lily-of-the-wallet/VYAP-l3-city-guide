import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { sights } from "../data/sights";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "SightDetails">;
const MAX_VISIT_HOURS = 8;

export default function SightDetailsScreen({ navigation, route }: Props) {
  const [visitHours, setVisitHours] = useState(1);
  const sight =
      sights.find((item) => item.id === route.params.sightId) ?? sights[0];
  const visitMinutes = visitHours * 60;

  function decreaseVisitHours() {
    setVisitHours((prev) => Math.max(1, prev - 1));
  }

  function increaseVisitHours() {
    setVisitHours((prev) => Math.min(MAX_VISIT_HOURS, prev + 1));
  }

  return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.screen}
      >
        <View style={styles.hero}>
          <Image
              source={sight.image}
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
            <Text style={styles.heroTitle}>{sight.title}</Text>
            <Text style={styles.heroCategory}>{sight.category}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{sight.description}</Text>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Адрес</Text>
            <Text style={styles.value}>{sight.address}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Время работы</Text>
            <Text style={styles.value}>{sight.openingHours}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Полезно знать</Text>
            <Text style={styles.value}>{sight.tip}</Text>
          </View>

          <View style={styles.visitBlock}>
            <Text style={styles.label}>Планируемое посещение</Text>
            <View style={styles.counterRow}>
              <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Уменьшить время посещения"
                  disabled={visitHours === 1}
                  onPress={decreaseVisitHours}
                  style={[
                    styles.counterButton,
                    visitHours === 1 && styles.counterButtonDisabled,
                  ]}
              >
                <Text style={styles.counterButtonText}>−</Text>
              </Pressable>

              <Text style={styles.counterValue}>{visitHours} ч</Text>

              <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Увеличить время посещения"
                  disabled={visitHours === MAX_VISIT_HOURS}
                  onPress={increaseVisitHours}
                  style={[
                    styles.counterButton,
                    visitHours === MAX_VISIT_HOURS && styles.counterButtonDisabled,
                  ]}
              >
                <Text
                    style={[
                      styles.counterButtonText,
                      visitHours === MAX_VISIT_HOURS &&
                      styles.counterButtonTextDisabled,
                    ]}
                >
                  +
                </Text>
              </Pressable>
            </View>
            <Text style={styles.visitSummary}>
              На посещение запланировано: {visitMinutes} мин.
            </Text>
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
    paddingBottom: 32,
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
  visitBlock: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 16,
  },
  counterButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#4C6FFF",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  counterButtonDisabled: {
    backgroundColor: "#E7EAF0",
    borderColor: "#E7EAF0",
  },
  counterButtonText: {
    color: "#4C6FFF",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  counterButtonTextDisabled: {
    color: "#5A6472",
  },
  counterValue: {
    minWidth: 44,
    color: "#14181F",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
  visitSummary: {
    marginTop: 12,
    color: "#14181F",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
});
