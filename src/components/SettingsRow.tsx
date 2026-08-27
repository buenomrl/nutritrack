import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { SettingRow } from '../types';

interface SettingsRowProps {
  row: SettingRow;
  /** Rows are separated by a hairline; the last one in the group has none. */
  showDivider: boolean;
}

/** A label/value line inside the grouped Settings card. */
export function SettingsRow({ row, showDivider }: SettingsRowProps): React.JSX.Element {
  return (
    <View style={[styles.row, showDivider && styles.divider]}>
      <Text style={styles.label}>{row.label}</Text>
      <Text style={styles.value}>{row.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.s14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  label: typography.settingLabel,
  value: typography.settingValue,
});
