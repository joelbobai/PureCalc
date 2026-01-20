import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Display from '../components/Display';
import Keypad from '../components/Keypad';
import { colors, spacing } from '../styles/theme';
import { getDisplayValue, getExpression, handleInput, initialState } from '../utils/calculator';

export default function HomeScreen() {
  const [state, setState] = useState(initialState);

  const displayValue = useMemo(() => getDisplayValue(state), [state]);
  const expression = useMemo(() => getExpression(state), [state]);

  const onPress = (label: string) => {
    setState((prev) => handleInput(prev, label));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Display expression={expression} value={displayValue} />
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
    justifyContent: 'space-between',
  },
});
