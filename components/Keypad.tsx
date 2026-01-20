import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalculatorButton from './CalculatorButton';
import { spacing } from '../styles/theme';

const rows: Array<Array<{ label: string; variant?: 'default' | 'operator' | 'accent' | 'danger' | 'wide' }>> = [
  [
    { label: 'C', variant: 'danger' },
    { label: '⌫', variant: 'accent' },
    { label: '÷', variant: 'operator' },
  ],
  [
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '×', variant: 'operator' },
  ],
  [
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '-', variant: 'operator' },
  ],
  [
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', variant: 'operator' },
  ],
];

const lastRow = [
  { label: '0', variant: 'wide' as const },
  { label: '.', variant: 'accent' as const },
  { label: '=', variant: 'operator' as const },
];

type KeypadProps = {
  onPress: (label: string) => void;
};

export default function Keypad({ onPress }: KeypadProps) {
  return (
    <View style={styles.container}>
      {rows.map((row, index) => (
        <View key={`row-${index}`} style={styles.row}>
          {row.map((button) => (
            <CalculatorButton
              key={button.label}
              label={button.label}
              onPress={() => onPress(button.label)}
              variant={button.variant}
            />
          ))}
        </View>
      ))}
      <View style={styles.row}>
        {lastRow.map((button) => (
          <CalculatorButton
            key={button.label}
            label={button.label}
            onPress={() => onPress(button.label)}
            variant={button.variant}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
