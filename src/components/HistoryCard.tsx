import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { HistoryEntry } from '../types';
import { formatNumber } from '../utils/format';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';

interface HistoryCardProps {
  entry: HistoryEntry;
}

/** One past day: label, kcal against goal, and how full that day was. */
export function HistoryCard({ entry }: HistoryCardProps): React.JSX.Element {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>{entry.label}</Text>
        <Text style={styles.value}>
          {`${formatNumber(entry.kcal)} / ${formatNumber(entry.goalKcal)} kcal`}
        </Text>
      </View>
      <View style={styles.bar}>
        <ProgressBar
          ratio={entry.goalKcal > 0 ? entry.kcal / entry.goalKcal : 0}
          trackColor={colors.barTrack}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.s13,
    paddingHorizontal: spacing.s14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: typography.historyLabel,
  value: typography.historyValue,
  bar: {
    marginTop: spacing.s9,
  },
});
