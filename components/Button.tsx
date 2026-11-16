import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
    children: string;
    variant?: "primary" | "secondary";
    onPress: () => void;
    disabled?: boolean;
};

export default function Button({ children, variant = "primary", onPress, disabled = false }: ButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            disabled={disabled}
            style={[styles.button, variant === "primary" ? styles.primary : styles.secondary, disabled && styles.disabled]}
        >
            <Text style={variant === "primary" ? styles.primaryText : styles.secondaryText}>
                {children}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    disabled: {
        opacity: 0.5,
    },
    primary: {
        backgroundColor: "#4C6FFF",
    },
    secondary: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#4C6FFF",
    },
    primaryText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    secondaryText: {
        color: "#4C6FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
