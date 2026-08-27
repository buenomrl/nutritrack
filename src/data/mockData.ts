import type { FoodItem, HistoryEntry, MacroTarget, Meal, SettingRow } from '../types';

/**
 * Mock data only — no backend, no fetch.
 *
 * The supplied mockup is internally inconsistent: it shows two meals totalling
 * 830 kcal alongside "1500 kcal left" and "75% of daily goal". Those cannot all
 * be true at once. We keep the meals and the 1,500 kcal left and derive
 * everything from the data, which puts the daily goal at 2,330 kcal (ring: 64%).
 */
export const DAILY_GOAL_KCAL = 2330;

export const TODAY_ISO_DATE = '2026-02-01';

export const MOCK_MEALS: Meal[] = [
  { id: 'm1', items: ['Oatmeal with berries', '2% Milk', 'Almonds'], kcal: 380 },
  { id: 'm2', items: ['Grilled Chicken Salad', 'Whole Wheat Bread', 'Olive Oil Dressing'], kcal: 450 },
];

export const MOCK_MACROS: MacroTarget[] = [
  { key: 'protein', label: 'Protein', current: 80, goal: 120, unit: 'g' },
  { key: 'carbs', label: 'Carbs', current: 200, goal: 250, unit: 'g' },
  { key: 'fat', label: 'Fat', current: 50, goal: 70, unit: 'g' },
];

export const MOCK_FOODS: FoodItem[] = [
  { id: 'f1', name: 'Greek Yogurt', serving: '170 g cup', kcal: 150 },
  { id: 'f2', name: 'Banana', serving: '1 medium', kcal: 105 },
  { id: 'f3', name: 'Protein Shake', serving: '1 scoop + water', kcal: 220 },
  { id: 'f4', name: 'Almonds', serving: '30 g', kcal: 170 },
  { id: 'f5', name: 'Brown Rice', serving: '1 cup cooked', kcal: 216 },
  { id: 'f6', name: 'Salmon Fillet', serving: '150 g', kcal: 280 },
];

export const MOCK_HISTORY: HistoryEntry[] = [
  { date: '2026-01-31', label: 'Sat, Jan 31', kcal: 2180, goalKcal: DAILY_GOAL_KCAL },
  { date: '2026-01-30', label: 'Fri, Jan 30', kcal: 1960, goalKcal: DAILY_GOAL_KCAL },
  { date: '2026-01-29', label: 'Thu, Jan 29', kcal: 2310, goalKcal: DAILY_GOAL_KCAL },
  { date: '2026-01-28', label: 'Wed, Jan 28', kcal: 1720, goalKcal: DAILY_GOAL_KCAL },
  { date: '2026-01-27', label: 'Tue, Jan 27', kcal: 2050, goalKcal: DAILY_GOAL_KCAL },
];

export const MOCK_SETTINGS: SettingRow[] = [
  { label: 'Daily calorie goal', value: '2,330 kcal' },
  { label: 'Protein target', value: '120 g' },
  { label: 'Carb target', value: '250 g' },
  { label: 'Fat target', value: '70 g' },
  { label: 'Units', value: 'Metric' },
];
