import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

type HistoryItem = {
  expression: string;
  result: string;
};

type HistoryPanelProps = {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  isHidden?: boolean;
};

export default function HistoryPanel({
  items,
  onSelect,
  onClear,
  isHidden = false,
}: HistoryPanelProps) {
  const hasItems = items.length > 0;
  const helperText = isHidden ? 'Hidden' : hasItems ? '' : 'Tap to reuse';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent calculations</Text>
        {isHidden ? (
          <Text style={styles.helper}>{helperText}</Text>
        ) : hasItems ? (
          <Pressable onPress={onClear} style={({ pressed }) => [styles.clearButton, pressed && styles.clearButtonPressed]}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        ) : (
          <Text style={styles.helper}>{helperText}</Text>
        )}
      </View>
      {isHidden ? (
        <Text style={styles.placeholder}>History hidden. Tap show to reveal.</Text>
      ) : !hasItems ? (
        <Text style={styles.placeholder}>No history yet. Start calculating!</Text>
      ) : (
        <ScrollView style={styles.listScroll} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
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
        </ScrollView>
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
  clearButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.cardElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  clearButtonPressed: {
    opacity: 0.8,
  },
  clearButtonText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: '600',
  },
  placeholder: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  list: {
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  listScroll: {
    maxHeight: 180,
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
