import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colors, layout, motion, radii } from '../theme';
import { clamp01 } from '../utils/format';

interface ProgressBarProps {
  /** Fill fraction, clamped to [0, 1]. */
  ratio: number;
  trackColor?: string;
  fillColor?: string;
}

const [x1, y1, x2, y2] = motion.bar.bezier;

/** Animated horizontal bar used by the macro list and the history cards. */
export function ProgressBar({
  ratio,
  trackColor = colors.ringTrack,
  fillColor = colors.green,
}: ProgressBarProps): React.JSX.Element {
  const progress = useRef(new Animated.Value(clamp01(ratio))).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: clamp01(ratio),
      duration: motion.bar.duration,
      easing: Easing.bezier(x1, y1, x2, y2),
      useNativeDriver: false,
    }).start();
  }, [progress, ratio]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { backgroundColor: trackColor }]}>
      <Animated.View style={[styles.fill, { backgroundColor: fillColor, width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: layout.progressBarHeight,
    borderRadius: radii.bar,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.bar,
  },
});
