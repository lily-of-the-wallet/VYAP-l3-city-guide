import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SightCardProps = {
  id: string;
  title: string;
  category: string;
  image: number;
  onPress: (id: string) => void;
};

// отображает карточку достопримечательности. данные получает через props
export default function SightCard({
  id,
  title,
  category,
  image,
  onPress,
}: SightCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(id)}
      style={styles.card}
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
  );
}

const styles = StyleSheet.create({
  card: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
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
