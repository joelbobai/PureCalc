import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, spacing, typography } from "../styles/theme";

type Variant = "default" | "operator" | "accent" | "danger" | "wide";

type CalculatorButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
};

const variantStyles: Record<Variant, { background: string; text: string }> = {
  default: {
    background: colors.surface,
    text: colors.textPrimary,
  },
  operator: {
    background: colors.operator,
    text: colors.operatorText,
  },
  accent: {
    background: colors.accent,
    text: colors.textPrimary,
  },
  danger: {
    background: colors.danger,
    text: colors.textPrimary,
  },
  wide: {
    background: colors.surface,
    text: colors.textPrimary,
  },
};

export default function CalculatorButton({
  label,
  onPress,
  variant = "default",
}: CalculatorButtonProps) {
  const palette = variantStyles[variant];
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === "wide" ? styles.wide : null,
        { backgroundColor: palette.background, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: palette.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: 64,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing.xs,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 6,
  },
  wide: {
    flex: 2,
    alignItems: "flex-start",
    paddingLeft: spacing.lg,
  },
  text: {
    fontSize: typography.button,
    fontWeight: "600",
  },
});
