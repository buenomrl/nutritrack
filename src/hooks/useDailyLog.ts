import { useCallback, useMemo, useRef, useState } from 'react';
import { MOCK_MACROS, MOCK_MEALS, TODAY_ISO_DATE } from '../data/mockData';
import type { DailySummary, DashboardTab, FoodItem, MacroTarget, Meal } from '../types';
import { clamp01 } from '../utils/format';

export interface UseDailyLog {
  /** Derived on every render from meals + macros — never stored twice. */
  summary: DailySummary;
  addFood: (food: FoodItem) => void;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

/**
 * The single stateful hook of the screen: it owns today's meals and macros and
 * derives consumed / remaining / ratios with useMemo. Every component below it
 * is presentational.
 */
export function useDailyLog(goalKcal: number): UseDailyLog {
  const [meals, setMeals] = useState<Meal[]>(MOCK_MEALS);
  const [macros] = useState<MacroTarget[]>(MOCK_MACROS);
  const [activeTab, setActiveTab] = useState<DashboardTab>('TODAY');
  const nextMealId = useRef(MOCK_MEALS.length);

  const addFood = useCallback((food: FoodItem) => {
    nextMealId.current += 1;
    const meal: Meal = {
      id: `m${nextMealId.current}-${food.id}`,
      items: [food.name],
      kcal: food.kcal,
    };
    setMeals((current) => [...current, meal]);
  }, []);

  const summary = useMemo<DailySummary>(() => {
    const consumedKcal = meals.reduce((total, meal) => total + meal.kcal, 0);
    const remainingKcal = Math.max(0, goalKcal - consumedKcal);

    return {
      date: TODAY_ISO_DATE,
      goalKcal,
      consumedKcal,
      remainingKcal,
      remainingRatio: clamp01(remainingKcal / goalKcal),
      macros,
      meals,
    };
  }, [goalKcal, macros, meals]);

  return { summary, addFood, activeTab, setActiveTab };
}
