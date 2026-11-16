import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type FormFieldProps = {
    label: string;
    error?: string;
    children: ReactNode;
};

// общая разметка поля и сообщения об ошибке
export default function FormField({ label, error, children }: FormFieldProps) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            {children}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        color: "#5A6472",
        fontSize: 13,
        fontWeight: "600",
    },
    error: {
        marginTop: 4,
        color: "#EF4444",
        fontSize: 12,
        lineHeight: 16,
    },
});
