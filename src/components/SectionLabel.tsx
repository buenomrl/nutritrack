import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { spacing, typography } from '../theme';

interface SectionLabelProps {
  children: string;
}

/** Uppercase section heading above each tab's list ("MEALS", "LAST 5 DAYS"...). */
export function SectionLabel({ children }: SectionLabelProps): React.JSX.Element {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...typography.sectionLabel,
    paddingHorizontal: spacing.s2,
    paddingBottom: spacing.s10,
  },
});
