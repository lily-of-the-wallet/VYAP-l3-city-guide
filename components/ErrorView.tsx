import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

type Props = { message: string; onRetry: () => void };

export default function ErrorView({ message, onRetry }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Не удалось загрузить данные</Text>
            <Text style={styles.message}>{message}</Text>
            <Button variant="secondary" onPress={onRetry}>Повторить</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, gap: 12 },
    title: { color: "#14181F", fontSize: 18, fontWeight: "600", textAlign: "center" },
    message: { color: "#5A6472", fontSize: 14, lineHeight: 20, textAlign: "center" },
});
