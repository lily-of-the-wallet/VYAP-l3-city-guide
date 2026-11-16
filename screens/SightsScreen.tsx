import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SightCard from "../components/SightCard";
import { useAuth } from "../context/AuthContext";
import { sights, type Sight } from "../data/sights";
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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  let visibleSights = sights;

  if (activeFilter === "favorites") {
    visibleSights = sights.filter((sight) => favoriteIds.includes(sight.id));
  } else if (activeFilter !== "all") {
    visibleSights = sights.filter(
        (sight) => sight.categoryId === activeFilter
    );
  }

  function toggleFavorite(id: string) {
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

          <Text style={styles.heading}>Достопримечательности</Text>
          <Text style={styles.description}>
            {activeFilter === "favorites"
                ? "Сохранённые места для будущих прогулок"
                : "Выберите место для следующей прогулки"}
          </Text>

          <View style={styles.searchField}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
                editable={false}
                placeholder="Найти место"
                placeholderTextColor="#5A6472"
                style={styles.searchInput}
            />
          </View>

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

        <FlatList
            data={visibleSights}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <SightCard
                    {...item}
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
                Пока нет избранных мест. Нажмите ☆ на карточке, чтобы сохранить
                достопримечательность
              </Text>
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
  searchField: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D5DAE2",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    color: "#5A6472",
    fontSize: 22,
    lineHeight: 24,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    padding: 0,
    color: "#14181F",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
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
