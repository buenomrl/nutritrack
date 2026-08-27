import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radii, shadows, spacing, typography } from '../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
}

/** The green "LOG FOOD" pill. */
export function PrimaryButton({ label, onPress }: PrimaryButtonProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pill, pressed && styles.pillPressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    minWidth: 132,
    alignItems: 'center',
    paddingVertical: spacing.s12,
    paddingHorizontal: spacing.s26,
    borderRadius: radii.pill,
    backgroundColor: colors.green,
    ...shadows.pill,
  },
  pillPressed: {
    backgroundColor: colors.greenPressed,
  },
  label: typography.primaryButton,
});
