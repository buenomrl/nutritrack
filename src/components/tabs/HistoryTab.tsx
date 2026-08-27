import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import type { HistoryEntry } from '../../types';
import { HistoryCard } from '../HistoryCard';
import { SectionLabel } from '../SectionLabel';

interface HistoryTabProps {
  entries: HistoryEntry[];
}

/** The last five days against the same daily goal. */
export function HistoryTab({ entries }: HistoryTabProps): React.JSX.Element {
  return (
    <View>
      <SectionLabel>LAST 5 DAYS</SectionLabel>
      <View style={styles.list}>
        {entries.map((entry) => (
          <HistoryCard key={entry.date} entry={entry} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.s10,
  },
});
