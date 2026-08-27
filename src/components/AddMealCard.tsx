import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shadows, spacing, typography } from '../theme';
import { Card } from './Card';

interface AddMealCardProps {
  onPress: () => void;
}

/** Card at the end of the meal list that opens the quick-add sheet. */
export function AddMealCard({ onPress }: AddMealCardProps): React.JSX.Element {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Add meal" onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.circle}>
          <View style={styles.plusBar} />
          <View style={[styles.plusBar, styles.plusBarVertical]} />
        </View>
        <Text style={styles.label}>Add Meal</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: spacing.s7,
    paddingTop: spacing.s16,
    paddingHorizontal: spacing.s14,
    paddingBottom: spacing.s15,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.plusCircle,
  },
  plusBar: {
    position: 'absolute',
    width: 15,
    height: 2.6,
    borderRadius: 2,
    backgroundColor: colors.surface,
  },
  plusBarVertical: {
    transform: [{ rotate: '90deg' }],
  },
  label: typography.addMealLabel,
});
