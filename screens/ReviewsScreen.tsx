import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import type { RootStackParamList } from "../App";
import type { Review } from "../api/types";
import ErrorView from "../components/ErrorView";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

type Props = NativeStackScreenProps<RootStackParamList, "Reviews">;

export default function ReviewsScreen({ navigation }: Props) {
    const { user } = useAuth();
    const author = encodeURIComponent(user ?? "гость");
    const { data, loading, error, reload } = useFetch<Review[]>(`/reviews?author=${author}`);

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Pressable accessibilityRole="button" onPress={() => navigation.goBack()}>
                    <Text style={styles.back}>← Назад</Text>
                </Pressable>
                <Text style={styles.heading}>Мои отзывы</Text>
                <Text style={styles.description}>Ваши впечатления о посещённых местах</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#4C6FFF" style={{ marginTop: 32 }} />
            ) : error ? (
                <ErrorView message={error} onRetry={reload} />
            ) : (
                <FlatList
                    data={data ?? []}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.empty}>Вы ещё не оставили ни одного отзыва</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.place}>{item.placeTitle}</Text>
                                <Text style={styles.rating}>★ {item.rating}</Text>
                            </View>
                            <Text style={styles.text}>{item.text}</Text>
                            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F2F4F8" },
    header: { paddingHorizontal: 24, paddingTop: 24 },
    back: { color: "#4C6FFF", fontSize: 14 },
    heading: { marginTop: 24, color: "#14181F", fontSize: 24, fontWeight: "600" },
    description: { marginTop: 8, color: "#5A6472", fontSize: 14 },
    list: { padding: 24, gap: 12 },
    empty: { color: "#5A6472", fontSize: 14, textAlign: "center" },
    card: { padding: 16, borderRadius: 16, backgroundColor: "#FFFFFF", gap: 10 },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
    place: { flex: 1, color: "#14181F", fontSize: 16, fontWeight: "600" },
    rating: { color: "#A36A00", fontSize: 15, fontWeight: "600" },
    text: { color: "#14181F", fontSize: 14, lineHeight: 20 },
    date: { color: "#5A6472", fontSize: 12 },
});
