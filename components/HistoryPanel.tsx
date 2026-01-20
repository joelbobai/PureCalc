import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

type HistoryItem = {
  expression: string;
  result: string;
};

type HistoryPanelProps = {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
};

export default function HistoryPanel({ items, onSelect }: HistoryPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent calculations</Text>
        <Text style={styles.helper}>Tap to reuse</Text>
      </View>
      {items.length === 0 ? (
        <Text style={styles.placeholder}>No history yet. Start calculating!</Text>
      ) : (
        <View style={styles.list}>
          {items.map((item, index) => (
            <Pressable
              key={`${item.expression}-${index}`}
              onPress={() => onSelect(item)}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            >
              <Text style={styles.expression} numberOfLines={1}>
                {item.expression}
              </Text>
              <Text style={styles.result}>{item.result}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.label,
    fontWeight: '600',
  },
  helper: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  placeholder: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  list: {
    gap: spacing.xs,
  },
  item: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 14,
    backgroundColor: colors.cardElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  itemPressed: {
    opacity: 0.8,
  },
  expression: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  result: {
    color: colors.textPrimary,
    fontSize: typography.expression,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});
