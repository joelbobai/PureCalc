import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const [isHistoryHidden, setIsHistoryHidden] = useState(false);
  const [stats, setStats] = useState({ total: 0, lastResult: "—" });

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
        setStats((current) => ({
          total: current.total + 1,
          lastResult: next.result ?? current.lastResult,
        }));
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
      <StatusBar style="light" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
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
              onPress={() => setIsHistoryHidden((current) => !current)}
              style={({ pressed }) => [
                styles.toggleButton,
                pressed && styles.toggleButtonPressed,
              ]}
            >
              <Text style={styles.toggleButtonText}>
                {isHistoryHidden ? "Show history" : "Hide history"}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Calculations</Text>
              <Text style={styles.statValue}>{stats.total}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Last result</Text>
              <Text style={styles.statValue}>{stats.lastResult}</Text>
            </View>
          </View>
          <Pressable
            onPress={() => setStats({ total: 0, lastResult: "—" })}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.resetButtonPressed,
            ]}
          >
            <Text style={styles.resetButtonText}>Reset stats</Text>
          </Pressable>
        </View>
        <Display
          expression={expression}
          value={displayValue}
          // isHidden={isDisplayHidden}
        />
        <HistoryPanel
          items={history}
          onSelect={handleHistorySelect}
          onClear={handleHistoryClear}
          isHidden={isHistoryHidden}
        />
        <Keypad onPress={onPress} />
      </ScrollView>
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
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    gap: spacing.md,
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
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    gap: spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.cardBorder,
    marginHorizontal: spacing.md,
  },
  resetButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  resetButtonPressed: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
