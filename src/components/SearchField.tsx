import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Card } from './Card';

interface SearchFieldProps {
  placeholder: string;
}

/** Static search affordance — the food list is mock data, so there is nothing to query. */
export function SearchField({ placeholder }: SearchFieldProps): React.JSX.Element {
  return (
    <Card style={styles.card}>
      <View style={styles.glyph} />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s8,
    paddingVertical: spacing.s11,
    paddingHorizontal: spacing.s13,
    marginBottom: spacing.s14,
  },
  glyph: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.6,
    borderColor: colors.glyphBorder,
  },
  placeholder: typography.searchPlaceholder,
});
