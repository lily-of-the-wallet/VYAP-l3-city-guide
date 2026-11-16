import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { imageUrl, postJson } from "../api/client";
import type { Review, Sight } from "../api/types";
import Button from "../components/Button";
import ErrorView from "../components/ErrorView";
import FormField from "../components/FormField";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "SightDetails">;
const MAX_VISIT_HOURS = 8;

export default function SightDetailsScreen({ navigation, route }: Props) {
  const { user } = useAuth();
  const [visitHours, setVisitHours] = useState(1);
  const { sightId } = route.params;
  const { data: sight, loading, error, reload } = useFetch<Sight>(`/places/${sightId}`);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const author = user ?? "гость";
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
      { rating: "", text: "" },
      (form) => {
        const next: Partial<Record<"rating" | "text", string>> = {};
        if (!/^[1-5]$/.test(form.rating.trim())) {
          next.rating = "Введите целую оценку от 1 до 5";
        }
        if (form.text.trim().length < 3 || form.text.trim().length > 500) {
          next.text = "Отзыв должен содержать от 3 до 500 символов";
        }
        return next;
      }
  );
  const visitMinutes = visitHours * 60;

  function decreaseVisitHours() {
    setVisitHours((prev) => Math.max(1, prev - 1));
  }

  function increaseVisitHours() {
    setVisitHours((prev) => Math.min(MAX_VISIT_HOURS, prev + 1));
  }

  function submitReview() {
    handleSubmit(async (validValues) => {
      if (!sight || sight.id !== sightId) {
        setSubmitError("Выберите существующее место");
        return;
      }

      if (!author.trim() || author.trim().length > 100) {
        setSubmitError("Укажите имя автора длиной до 100 символов");
        return;
      }

      setSubmitting(true);
      setResult(null);
      setSubmitError(null);

      try {
        const review = await postJson<Review>("/reviews", {
          placeId: sightId,
          rating: Number(validValues.rating.trim()),
          text: validValues.text.trim(),
          author: author.trim(),
        });

        setResult(`Отзыв № ${review.id} опубликован`);
        resetForm();
        reload();
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Не удалось отправить отзыв");
      } finally {
        setSubmitting(false);
      }
    });
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#4C6FFF" style={{ marginTop: 48 }} />;
  }
  if (error || !sight) {
    return (
        <View style={styles.screen}>
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.errorBack}>
            <Text style={styles.backButtonText}>← Назад</Text>
          </Pressable>
          <ErrorView message={error ?? "Место не найдено"} onRetry={reload} />
        </View>
    );
  }

  return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.screen}
      >
        <View style={styles.hero}>
          <Image
              source={{ uri: imageUrl(sight.image) }}
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
          <Text style={styles.rating}>
            {sight.rating === null ? "Пока нет оценок" : `★ ${sight.rating.toFixed(1)} · отзывов: ${sight.reviewCount}`}
          </Text>

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

          <View style={styles.reviewBlock}>
            <Text style={styles.reviewTitle}>Поделитесь впечатлением</Text>
            <Text style={styles.reviewHint}>Ваша оценка поможет другим выбрать место</Text>
            <FormField label="Оценка от 1 до 5" error={errors.rating}>
              <TextInput
                  accessibilityLabel="Оценка"
                  keyboardType="number-pad"
                  placeholder="Например, 5"
                  value={values.rating}
                  onChangeText={(text) => handleChange("rating", text)}
                  style={styles.input}
              />
            </FormField>
            <FormField label="Ваш отзыв" error={errors.text}>
              <TextInput
                  accessibilityLabel="Ваш отзыв"
                  multiline
                  placeholder="Что вам запомнилось?"
                  value={values.text}
                  onChangeText={(text) => handleChange("text", text)}
                  style={[styles.input, styles.reviewInput]}
              />
            </FormField>
            <Button onPress={submitReview} disabled={submitting}>
              {submitting ? "Отправляем…" : "Оставить отзыв"}
            </Button>
            {result ? <Text style={styles.success}>{result}</Text> : null}
            {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
          </View>

          <View style={styles.accountContent}>
            <Text style={styles.accountText}>
              {user ? `Вы под именем: ${user}` : "Гостевой режим"}
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
  errorBack: {
    alignSelf: "flex-start",
    marginTop: 24,
    marginLeft: 24,
    padding: 12,
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
  rating: {
    marginTop: 12,
    color: "#A36A00",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewBlock: {
    marginTop: 24,
    padding: 16,
    gap: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  reviewTitle: { color: "#14181F", fontSize: 18, fontWeight: "600" },
  reviewHint: { color: "#5A6472", fontSize: 13, lineHeight: 19 },
  input: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D5DAE2",
    borderRadius: 12,
    color: "#14181F",
    fontSize: 15,
  },
  reviewInput: { minHeight: 96, paddingTop: 12, textAlignVertical: "top" },
  success: { color: "#27804C", fontSize: 14 },
  submitError: { color: "#C03939", fontSize: 14 },
  accountContent: {
    backgroundColor: "#4c70ff",
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
  },
  accountText: {
    width: "100%",
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
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
