import React, { useMemo, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Display from "../../components/Display";
import HistoryPanel from "../../components/HistoryPanel";
import Keypad from "../../components/Keypad";
import { colors, spacing } from "../../styles/theme";
import {
  getDisplayValue,
  getExpression,
  handleInput,
  initialState,
} from "../../utils/calculator";

type HistoryItem = {
  expression: string;
  result: string;
};

export default function CalculatorScreen() {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isDisplayHidden, setIsDisplayHidden] = useState(false);

  const displayValue = useMemo(() => getDisplayValue(state), [state]);
  const expression = useMemo(() => getExpression(state), [state]);

  const onPress = (label: string) => {
    setState((prev) => {
      const next = handleInput(prev, label);
      if (label === "=" && next.expression && next.result && !next.error) {
        setHistory((existing) => [
          { expression: next.expression, result: next.result },
          ...existing,
        ]);
      }
      return next;
    });
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setState({
      ...initialState,
      currentInput: item.result,
      lastAction: "digit",
    });
  };

  const handleHistoryClear = () => {
    setHistory([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>PureCalc</Text>
            <Text style={styles.subtitle}>Fresh look, zero permissions.</Text>
          </View>
          <View style={styles.headerControls}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Offline ready</Text>
            </View>
            <Pressable
              onPress={() => setIsDisplayHidden((current) => !current)}
              style={({ pressed }) => [
                styles.toggleButton,
                pressed && styles.toggleButtonPressed,
              ]}
            >
              <Text style={styles.toggleButtonText}>
                {isDisplayHidden ? "Show" : "Hide"}
              </Text>
            </Pressable>
          </View>
        </View>
        <Display
          expression={expression}
          value={displayValue}
          isHidden={isDisplayHidden}
        />
        <HistoryPanel
          items={history}
          onSelect={handleHistorySelect}
          onClear={handleHistoryClear}
        />
        <Keypad onPress={onPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  headerControls: {
    alignItems: "flex-end",
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  badge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  toggleButton: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  toggleButtonPressed: {
    opacity: 0.7,
  },
  toggleButtonText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
