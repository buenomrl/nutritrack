import React from 'react';
import { StyleSheet, View } from 'react-native';
import { radii } from '../../theme';
import type { SettingRow } from '../../types';
import { Card } from '../Card';
import { SectionLabel } from '../SectionLabel';
import { SettingsRow } from '../SettingsRow';

interface SettingsTabProps {
  rows: SettingRow[];
}

/** The daily targets, grouped in a single card with hairline dividers. */
export function SettingsTab({ rows }: SettingsTabProps): React.JSX.Element {
  return (
    <View>
      <SectionLabel>GOALS</SectionLabel>
      <Card style={styles.group}>
        {rows.map((row, index) => (
          <SettingsRow key={row.label} row={row} showDivider={index < rows.length - 1} />
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: radii.card,
    overflow: 'hidden',
  },
});
