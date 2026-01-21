import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

type DisplayProps = {
  expression: string;
  value: string;
  isHidden?: boolean;
};

export default function Display({ expression, value, isHidden = false }: DisplayProps) {
  const expressionText = isHidden ? 'Calculation hidden' : expression || ' ';
  const valueText = isHidden ? '••••' : value;

  return (
    <View style={styles.container}>
      <Text style={styles.expression} numberOfLines={1}>
        {expressionText}
      </Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {valueText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.display,
    borderRadius: 28,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    minHeight: 140,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  expression: {
    color: colors.textSecondary,
    fontSize: typography.expression,
    textAlign: 'right',
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.display,
    fontWeight: '600',
    textAlign: 'right',
  },
});
