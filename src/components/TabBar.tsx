import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { DashboardTab } from '../types';

interface TabBarProps {
  tabs: readonly DashboardTab[];
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

/** Four equal-width tabs; the active one is green with a 2 pt underline. */
export function TabBar({ tabs, active, onChange }: TabBarProps): React.JSX.Element {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(tab)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.s8,
    borderBottomWidth: 1,
    borderBottomColor: colors.tabBarBorder,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing.s14,
    paddingBottom: spacing.s11,
    // Transparent when inactive so switching tabs never shifts the layout.
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.green,
  },
  label: typography.tabLabel,
  labelActive: {
    color: colors.green,
  },
  labelInactive: {
    color: colors.textInactive,
  },
});
