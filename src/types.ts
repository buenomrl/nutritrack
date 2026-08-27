// Interfaces for the NutriTrack dashboard (from the design handoff).

export type DashboardTab = 'TODAY' | 'HISTORY' | 'FOODS' | 'SETTINGS';
export type MacroKey = 'protein' | 'carbs' | 'fat';

export interface FoodItem {
  id: string;
  name: string;
  /** Human-readable portion, e.g. "170 g cup" */
  serving: string;
  kcal: number;
}

export interface Meal {
  id: string;
  /** One line per food, as shown in the card */
  items: string[];
  kcal: number;
  loggedAt?: string; // ISO date-time
}

export interface MacroTarget {
  key: MacroKey;
  label: string;
  /** Grams consumed today */
  current: number;
  /** Daily target in grams */
  goal: number;
  unit: 'g';
}

export interface DailySummary {
  /** ISO date, e.g. "2026-02-01" */
  date: string;
  goalKcal: number;
  consumedKcal: number;
  remainingKcal: number;
  /** remainingKcal / goalKcal, clamped to [0, 1] — drives the ring */
  remainingRatio: number;
  macros: MacroTarget[];
  meals: Meal[];
}

export interface HistoryEntry {
  date: string;
  /** Display label, e.g. "Sat, Jan 31" */
  label: string;
  kcal: number;
  goalKcal: number;
}

export interface SettingRow {
  label: string;
  value: string;
}
