import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardHeader } from '../components/DashboardHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { QuickAddSheet } from '../components/QuickAddSheet';
import { TabBar } from '../components/TabBar';
import { FoodsTab } from '../components/tabs/FoodsTab';
import { HistoryTab } from '../components/tabs/HistoryTab';
import { SettingsTab } from '../components/tabs/SettingsTab';
import { TodayTab } from '../components/tabs/TodayTab';
import { DAILY_GOAL_KCAL, MOCK_FOODS, MOCK_HISTORY, MOCK_SETTINGS } from '../data/mockData';
import { useDailyLog } from '../hooks/useDailyLog';
import { colors, spacing } from '../theme';
import type { DashboardTab, FoodItem } from '../types';

const TABS: readonly DashboardTab[] = ['TODAY', 'HISTORY', 'FOODS', 'SETTINGS'];

/** How many foods the quick-add sheet offers. */
const QUICK_ADD_COUNT = 4;

/**
 * The nutrition dashboard. It owns layout, the active tab and the sheet's
 * visibility; all data comes from useDailyLog.
 */
export function DashboardScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { summary, addFood, activeTab, setActiveTab } = useDailyLog(DAILY_GOAL_KCAL);
  const [isSheetVisible, setSheetVisible] = useState(false);

  const quickAddFoods = useMemo(() => MOCK_FOODS.slice(0, QUICK_ADD_COUNT), []);

  const openSheet = useCallback(() => setSheetVisible(true), []);
  const closeSheet = useCallback(() => setSheetVisible(false), []);

  const handleAddFood = useCallback((food: FoodItem) => addFood(food), [addFood]);

  const renderTab = (): React.JSX.Element => {
    switch (activeTab) {
      case 'TODAY':
        return <TodayTab meals={summary.meals} onAddMeal={openSheet} />;
      case 'HISTORY':
        return <HistoryTab entries={MOCK_HISTORY} />;
      case 'FOODS':
        return <FoodsTab foods={MOCK_FOODS} onAddFood={handleAddFood} />;
      case 'SETTINGS':
        return <SettingsTab rows={MOCK_SETTINGS} />;
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <DashboardHeader
        remainingKcal={summary.remainingKcal}
        goalKcal={summary.goalKcal}
        macros={summary.macros}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {renderTab()}
      </ScrollView>

      <View style={[styles.actionRow, { paddingBottom: spacing.s10 + insets.bottom }]}>
        <PrimaryButton label="LOG FOOD" onPress={openSheet} />
      </View>

      <QuickAddSheet
        visible={isSheetVisible}
        foods={quickAddFoods}
        onSelect={handleAddFood}
        onClose={closeSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // Matches the header gradient so the status-bar area blends into it.
    backgroundColor: colors.headerGradientStart,
  },
  content: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  contentInner: {
    paddingTop: spacing.s16,
    paddingHorizontal: spacing.s16,
    paddingBottom: spacing.s4,
  },
  actionRow: {
    alignItems: 'center',
    backgroundColor: colors.appBackground,
    paddingTop: spacing.s14,
    paddingHorizontal: spacing.s16,
  },
});
