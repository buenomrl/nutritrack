import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import type { FoodItem } from '../../types';
import { FoodRow } from '../FoodRow';
import { SearchField } from '../SearchField';

interface FoodsTabProps {
  foods: FoodItem[];
  onAddFood: (food: FoodItem) => void;
}

/** The food library; "+" logs a food to today without opening the sheet. */
export function FoodsTab({ foods, onAddFood }: FoodsTabProps): React.JSX.Element {
  return (
    <View>
      <SearchField placeholder="Search foods" />
      <View style={styles.list}>
        {foods.map((food) => (
          <FoodRow key={food.id} food={food} onAdd={onAddFood} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.s8,
  },
});
