import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, motion, radii, spacing, typography } from '../theme';
import type { FoodItem } from '../types';
import { formatKcal } from '../utils/format';

interface QuickAddSheetProps {
  visible: boolean;
  foods: FoodItem[];
  onSelect: (food: FoodItem) => void;
  onClose: () => void;
}

const [x1, y1, x2, y2] = motion.sheet.bezier;
const FALLBACK_SHEET_HEIGHT = 420;

/**
 * Bottom sheet for logging a food in one tap. Driven by Animated rather than
 * Modal's own transitions so the backdrop and the sheet can use the durations
 * and easings from the spec.
 */
export function QuickAddSheet({
  visible,
  foods,
  onSelect,
  onClose,
}: QuickAddSheetProps): React.JSX.Element | null {
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState(FALLBACK_SHEET_HEIGHT);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: motion.sheet.duration,
        easing: Easing.bezier(x1, y1, x2, y2),
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(progress, {
      toValue: 0,
      duration: motion.sheet.duration,
      easing: Easing.bezier(x1, y1, x2, y2),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMounted(false);
      }
    });
  }, [progress, visible]);

  const handleSelect = useCallback(
    (food: FoodItem) => {
      onSelect(food);
      onClose();
    },
    [onClose, onSelect],
  );

  if (!mounted) {
    return null;
  }

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight, 0],
  });

  return (
    <SheetHost onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: progress }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            style={StyleSheet.absoluteFill}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, spacing.s26), transform: [{ translateY }] },
          ]}
          onLayout={(event) => setSheetHeight(event.nativeEvent.layout.height)}
        >
          <View style={styles.grabber} />
          <Text style={styles.title}>Quick add</Text>

          <View style={styles.rows}>
            {foods.map((food) => (
              <Pressable
                key={food.id}
                accessibilityRole="button"
                onPress={() => handleSelect(food)}
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
              >
                <Text style={styles.rowName}>{food.name}</Text>
                <Text style={styles.rowKcal}>{formatKcal(food.kcal)}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable accessibilityRole="button" onPress={onClose} style={styles.cancel}>
            <Text style={styles.cancelLabel}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SheetHost>
  );
}

interface SheetHostProps {
  onRequestClose: () => void;
  children: React.ReactNode;
}

/**
 * On native the sheet has to escape the layout, so it lives in a Modal. On web
 * a Modal would portal to the document root and break out of the device frame,
 * so there it is overlaid in place.
 */
function SheetHost({ onRequestClose, children }: SheetHostProps): React.JSX.Element {
  if (Platform.OS === 'web') {
    return <View style={styles.webHost}>{children}</View>;
  }

  return (
    <Modal transparent visible animationType="none" onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  webHost: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    paddingTop: spacing.s18,
    paddingHorizontal: spacing.s18,
  },
  grabber: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.grabber,
    alignSelf: 'center',
    marginBottom: spacing.s14,
  },
  title: {
    ...typography.sheetTitle,
    paddingBottom: spacing.s12,
  },
  rows: {
    gap: spacing.s8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radii.card,
    paddingVertical: spacing.s13,
    paddingHorizontal: spacing.s14,
  },
  rowPressed: {
    backgroundColor: colors.greenSurfaceTint,
    borderColor: colors.greenBorder,
  },
  rowName: typography.sheetItemName,
  rowKcal: typography.sheetItemKcal,
  cancel: {
    alignItems: 'center',
    paddingTop: spacing.s15,
  },
  cancelLabel: typography.sheetCancel,
});
