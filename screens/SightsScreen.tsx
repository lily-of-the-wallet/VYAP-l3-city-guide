import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { imageUrl } from "../api/client";
import type { Sight } from "../api/types";
import ErrorView from "../components/ErrorView";
import useFetch from "../hooks/useFetch";
import SightCard from "../components/SightCard";
import { useAuth } from "../context/AuthContext";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Sights">;
type FilterId = "all" | Sight["categoryId"] | "favorites";

const filters: { id: FilterId; title: string }[] = [
  { id: "all", title: "Все" },
  { id: "architecture", title: "Архитектура" },
  { id: "museums", title: "Музеи" },
  { id: "parks", title: "Парки" },
  { id: "favorites", title: "Избранное" },
];

// управляет списком достопримечательностей и избранными объектами
export default function SightsScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const category = activeFilter === "all" || activeFilter === "favorites" ? "" : activeFilter;
  const { data, loading, error, reload } = useFetch<Sight[]>(`/places?category=${encodeURIComponent(category)}`);
  const sights = data ?? [];
  let visibleSights = sights;

  if (activeFilter === "favorites") {
    visibleSights = sights.filter((sight) => favoriteIds.includes(sight.id));
  } else if (activeFilter !== "all") {
    visibleSights = sights.filter(
        (sight) => sight.categoryId === activeFilter
    );
  }

  function toggleFavorite(id: number) {
    setFavoriteIds((prev) =>
        prev.includes(id)
            ? prev.filter((favoriteId) => favoriteId !== id)
            : [...prev, id]
    );
  }

  function selectFilter(filter: FilterId) {
    setActiveFilter((prev) => (prev === filter ? prev : filter));
  }

  function returnToLogin() {
    logout();
    navigation.goBack();
  }

  return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.accountRow}>
            <Text style={styles.accountText} numberOfLines={1}>
              {user ? `Вы вошли: ${user}` : "Гостевой режим"}
            </Text>
            <Pressable accessibilityRole="button" onPress={returnToLogin}>
              <Text style={styles.backLinkText}>{user ? "Выйти" : "Ко входу"}</Text>
            </Pressable>
          </View>

          <Pressable accessibilityRole="button" onPress={() => navigation.navigate("Reviews")}>
            <Text style={styles.backLinkText}>Мои отзывы →</Text>
          </Pressable>
          <Text style={styles.heading}>Достопримечательности</Text>
          <Text style={styles.description}>
            {activeFilter === "favorites"
                ? "Сохранённые места для будущих прогулок"
                : "Выберите место для следующей прогулки"}
          </Text>

          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
          >
            {filters.map((filter) => (
                <Pressable
                    key={filter.id}
                    accessibilityRole="button"
                    onPress={() => selectFilter(filter.id)}
                    style={[
                      styles.category,
                      activeFilter === filter.id && styles.categoryActive,
                    ]}
                >
                  <Text
                      numberOfLines={1}
                      style={[
                        styles.categoryText,
                        activeFilter === filter.id && styles.categoryTextActive,
                      ]}
                  >
                    {filter.title}
                  </Text>
                </Pressable>
            ))}
          </ScrollView>

          {favoriteIds.length > 0 && (
              <Text style={styles.favoriteCount}>
                В избранном: {favoriteIds.length}
              </Text>
          )}
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#4C6FFF" style={{ marginTop: 32 }} />
        ) : error ? (
            <ErrorView message={error} onRetry={reload} />
        ) : <FlatList
            data={visibleSights}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <SightCard
                    {...item}
                    image={{ uri: imageUrl(item.image) }}
                    isFavorite={favoriteIds.includes(item.id)}
                    onToggleFavorite={() => toggleFavorite(item.id)}
                    onPress={(sightId) =>
                        navigation.navigate("SightDetails", { sightId })
                    }
                />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {activeFilter === "favorites" ? "Пока нет избранных мест" : "В этой категории пока нет мест"}
              </Text>
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />}
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  accountText: {
    flex: 1,
    color: "#5A6472",
    fontSize: 14,
    lineHeight: 20,
  },
  backLinkText: {
    color: "#4C6FFF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
  },
  heading: {
    marginTop: 16,
    color: "#14181F",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },
  description: {
    marginTop: 16,
    color: "#5A6472",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  categories: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  category: {
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
  },
  categoryActive: {
    backgroundColor: "#4C6FFF",
  },
  categoryText: {
    color: "#5A6472",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  favoriteCount: {
    marginTop: 16,
    color: "#5A6472",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 16,
  },
  emptyText: {
    color: "#5A6472",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
  },
});
