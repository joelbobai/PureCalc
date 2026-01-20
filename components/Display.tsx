import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

type DisplayProps = {
  expression: string;
  value: string;
};

export default function Display({ expression, value }: DisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.expression} numberOfLines={1}>
        {expression || ' '}
      </Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.display,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    minHeight: 140,
    justifyContent: 'space-between',
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
