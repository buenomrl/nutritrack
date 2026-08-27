import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import type { Meal } from '../../types';
import { AddMealCard } from '../AddMealCard';
import { MealCard } from '../MealCard';
import { SectionLabel } from '../SectionLabel';

interface TodayTabProps {
  meals: Meal[];
  onAddMeal: () => void;
}

/** Today's logged meals, plus the card that opens the quick-add sheet. */
export function TodayTab({ meals, onAddMeal }: TodayTabProps): React.JSX.Element {
  return (
    <View>
      <SectionLabel>MEALS</SectionLabel>
      <View style={styles.list}>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
        <AddMealCard onPress={onAddMeal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.s10,
  },
});
