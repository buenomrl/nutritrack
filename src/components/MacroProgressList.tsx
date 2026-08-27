import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../theme';
import type { MacroTarget } from '../types';
import { ProgressBar } from './ProgressBar';

interface MacroProgressListProps {
  macros: MacroTarget[];
}

/** Protein / Carbs / Fat, each as a label + value line with a bar underneath. */
export function MacroProgressList({ macros }: MacroProgressListProps): React.JSX.Element {
  return (
    <View style={styles.list}>
      {macros.map((macro) => (
        <View key={macro.key}>
          <View style={styles.row}>
            <Text style={styles.label}>{macro.label}</Text>
            <Text style={styles.value}>
              {`${macro.current}${macro.unit} / ${macro.goal}${macro.unit}`}
            </Text>
          </View>
          <View style={styles.bar}>
            <ProgressBar ratio={macro.goal > 0 ? macro.current / macro.goal : 0} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.s13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: typography.macroLabel,
  value: typography.macroValue,
  bar: {
    marginTop: spacing.s5,
  },
});
