import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SightCard from "../components/SightCard";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Sights">;

const sights = [
  {
    id: "town-hall-1",
    title: "Старая ратуша",
    category: "Архитектура · исторический центр",
  },
  {
    id: "town-hall-2",
    title: "Старая ратуша",
    category: "Архитектура · исторический центр",
  },
  {
    id: "town-hall-3",
    title: "Старая ратуша",
    category: "Архитектура · исторический центр",
  },
  {
    id: "town-hall-4",
    title: "Старая ратуша",
    category: "Архитектура · исторический центр",
  },
  {
    id: "town-hall-5",
    title: "Старая ратуша",
    category: "Архитектура · исторический центр",
  },
];

const categories = [
  { id: "all", title: "Все", isActive: true },
  { id: "architecture", title: "Архитектура", isActive: false },
  { id: "museums", title: "Музеи", isActive: false },
  { id: "parks", title: "Парки", isActive: false },
];

// формирует список карточек. использует локальный массив объектов
export default function SightsScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="link"
          onPress={() => navigation.goBack()}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>← Назад ко входу</Text>
        </Pressable>

        <Text style={styles.heading}>Достопримечательности</Text>
        <Text style={styles.description}>
          Выберите место для следующей прогулки
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

        <View style={styles.categories}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.category,
                category.isActive && styles.categoryActive,
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.categoryText,
                  category.isActive && styles.categoryTextActive,
                ]}
              >
                {category.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.list}>
          {sights.map((sight) => (
            <SightCard
              key={sight.id}
              {...sight}
              image={require("../assets/town-hall.png")}
              onPress={(sightId) =>
                navigation.navigate("SightDetails", { sightId })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  backLink: {
    alignSelf: "flex-start",
    height: 16,
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
    marginLeft: 10,
    padding: 0,
    color: "#14181F",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
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
  list: {
    gap: 16,
    marginTop: 16,
  },
});
