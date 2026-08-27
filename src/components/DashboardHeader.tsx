import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { MacroTarget } from '../types';
import { DailyGoalRing } from './DailyGoalRing';
import { LeafMark } from './LeafMark';
import { MacroProgressList } from './MacroProgressList';

interface DashboardHeaderProps {
  remainingKcal: number;
  goalKcal: number;
  macros: MacroTarget[];
}

/** Light-green header: wordmark, the budget ring and the three macro bars. */
export function DashboardHeader({
  remainingKcal,
  goalKcal,
  macros,
}: DashboardHeaderProps): React.JSX.Element {
  return (
    <LinearGradient
      colors={[colors.headerGradientStart, colors.headerGradientEnd]}
      style={styles.header}
    >
      <View style={styles.titleRow}>
        <Text style={styles.title}>NutriTrack</Text>
        <LeafMark />
      </View>

      <View style={styles.body}>
        <DailyGoalRing remainingKcal={remainingKcal} goalKcal={goalKcal} />
        <View style={styles.macros}>
          <MacroProgressList macros={macros} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.s4,
    paddingHorizontal: spacing.s20,
    paddingBottom: spacing.s16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s7,
    paddingTop: spacing.s6,
    paddingBottom: spacing.s2,
  },
  title: typography.appTitle,
  body: {
    gap: spacing.s4,
    marginTop: spacing.s2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  macros: {
    flex: 1,
    paddingRight: spacing.s4,
  },
});
