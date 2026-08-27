import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../theme';
import type { Meal } from '../types';
import { formatKcal } from '../utils/format';
import { Card } from './Card';

interface MealCardProps {
  meal: Meal;
}

/** One logged meal: its food lines on the left, the calorie total on the right. */
export function MealCard({ meal }: MealCardProps): React.JSX.Element {
  return (
    <Card style={styles.card}>
      <View style={styles.items}>
        {meal.items.map((item) => (
          <Text key={item} style={styles.item}>
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.kcal} numberOfLines={1}>
        {formatKcal(meal.kcal)}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s13,
    paddingHorizontal: spacing.s14,
  },
  items: {
    gap: spacing.s3,
    flexShrink: 1,
  },
  item: typography.mealItem,
  kcal: {
    ...typography.mealKcal,
    paddingLeft: spacing.s10,
  },
});
