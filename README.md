# NutriTrack — nutrition dashboard

A single-screen nutrition dashboard built with **Expo + React Native + TypeScript** (strict),
running from the same codebase on iOS, Android and web. Mock data only — no backend.

Live web build: deployed from this repo (`expo export -p web` → static output).

## Run it

```bash
npm install
npm start          # Expo dev server (iOS / Android / web)
npm run web        # web only
npm run typecheck  # tsc --noEmit
npm run build:web  # static export into ./dist
```

## Architecture

```
src/
  screens/DashboardScreen.tsx    layout, active tab, sheet visibility
  components/                    one presentational component per file
    DailyGoalRing.tsx            SVG ring, animated from derived data
    MacroProgressList.tsx        Protein / Carbs / Fat
    ProgressBar.tsx              reused by macros and history
    TabBar.tsx  MealCard.tsx  AddMealCard.tsx  FoodRow.tsx
    SettingsRow.tsx  PrimaryButton.tsx  QuickAddSheet.tsx
    Card.tsx  SectionLabel.tsx  SearchField.tsx  HistoryCard.tsx
    LeafMark.tsx  DashboardHeader.tsx  DeviceFrame.tsx
    tabs/                        TodayTab, HistoryTab, FoodsTab, SettingsTab
  hooks/useDailyLog.ts           the only stateful piece
  data/mockData.ts               meals, macros, foods, history, settings
  utils/format.ts                number / kcal / percentage formatting
  theme.ts                       colors, spacing, radii, typography, shadows, motion
  types.ts                       every interface used across the app
```

Three rules hold the structure together:

1. **One stateful hook.** `useDailyLog(goalKcal)` owns today's meals and macros;
   `consumed`, `remaining` and `remainingRatio` are derived with `useMemo` and never
   stored twice. Every component below it takes typed props and renders.
2. **No loose values in the UI layer.** Colors, spacing, type styles, radii, shadows and
   animation durations all come from `theme.ts`.
3. **Interfaces first.** `types.ts` describes the domain (`Meal`, `MacroTarget`,
   `DailySummary`, `FoodItem`, `HistoryEntry`, `SettingRow`, `DashboardTab`); no `any`,
   `strict: true`.

## Behaviour

- The ring shows what is **left** of the daily budget, animated over 550 ms
  (`strokeDashoffset` on `react-native-svg`); macro bars animate over 500 ms.
- Tabs swap only the content area — header, action button and sheet are untouched.
- **Add Meal** and **LOG FOOD** open the quick-add sheet (280 ms slide, 200 ms backdrop fade);
  picking a food appends a meal, closes the sheet and re-animates the ring.
- The **FOODS** tab's `+` logs a food directly, without opening the sheet.
- Remaining kcal is clamped at 0 and the ring fraction to `[0, 1]`.

## A note on the mockup

The supplied mockup shows two meals totalling **830 kcal**, alongside **"1500 kcal left"**
and **"75% of daily goal"** — those three numbers cannot all be true at once. Rather than
hardcoding `1500`, the app keeps the math derived from data and sets the daily goal to
**2,330 kcal**, which produces exactly the meals and the "1,500 kcal left" from the mockup,
with the ring reading 64%.

## Platform notes

- Shadows use `shadowColor/Offset/Opacity/Radius` on iOS and web, `elevation` on Android.
- `DeviceFrame` is web-only: it keeps the app at its 393 × 852 pt design frame instead of
  stretching across a desktop window. On native it renders its children untouched.
- The quick-add sheet uses `Modal` on native; on web a `Modal` would portal to the document
  root and escape the device frame, so it is overlaid in place instead.
