import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { FoodItem } from '../types';
import { formatKcal } from '../utils/format';
import { Card } from './Card';

interface FoodRowProps {
  food: FoodItem;
  onAdd: (food: FoodItem) => void;
}

/** A food from the library, with a "+" that logs it straight to today. */
export function FoodRow({ food, onAdd }: FoodRowProps): React.JSX.Element {
  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.serving}>{food.serving}</Text>
      </View>

      <View style={styles.trailing}>
        <Text style={styles.kcal}>{formatKcal(food.kcal)}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add ${food.name}`}
          onPress={() => onAdd(food)}
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        >
          <View style={styles.plusBar} />
          <View style={[styles.plusBar, styles.plusBarVertical]} />
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s11,
    paddingLeft: spacing.s14,
    paddingRight: spacing.s12,
  },
  info: {
    gap: spacing.s2,
    flexShrink: 1,
  },
  name: typography.foodName,
  serving: typography.foodServing,
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s10,
  },
  kcal: typography.foodKcal,
  addButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.greenTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    backgroundColor: colors.greenTintPressed,
  },
  plusBar: {
    position: 'absolute',
    width: 11,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.green,
  },
  plusBarVertical: {
    transform: [{ rotate: '90deg' }],
  },
});
