import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SightCardProps = {
  id: string;
  title: string;
  category: string;
  image: ImageSourcePropType;
  onPress: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

// Карточка получает данные и состояние избранного через props.
export default function SightCard({
                                    id,
                                    title,
                                    category,
                                    image,
                                    onPress,
                                    isFavorite,
                                    onToggleFavorite,
                                  }: SightCardProps) {
  return (
      <View style={styles.card}>
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Открыть: ${title}`}
            onPress={() => onPress(id)}
            style={styles.cardContent}
        >
          <Image
              source={image}
              resizeMode="cover"
              style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
          </View>
        </Pressable>

        <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Убрать из избранного" : "Добавить в избранное"
            }
            hitSlop={8}
            onPress={onToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive,
            ]}
        >
          <Text
              style={isFavorite ? styles.favoriteActive : styles.favoriteInactive}
          >
            {isFavorite ? "★" : "☆"}
          </Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
  },
  image: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 16,
  },
  overlay: {
    height: 80,
    marginTop: "auto",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(20, 24, 31, 0.55)",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#4C6FFF",
  },
  favoriteButtonActive: {
    backgroundColor: "#efbf44",
  },
  favoriteActive: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 28,
  },
  favoriteInactive: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 28,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  category: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
});
