import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, Path, Text as SvgText, TextPath } from 'react-native-svg';
import { colors, layout, motion, spacing, typography } from '../theme';
import { clamp01, formatNumber, toPercent } from '../utils/format';

interface DailyGoalRingProps {
  remainingKcal: number;
  goalKcal: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { size, cx, cy, radius, strokeWidth } = layout.ring;
const CIRCUMFERENCE = 2 * Math.PI * radius;
const [x1, y1, x2, y2] = motion.ring.bezier;

/** Arc the caption follows, above and to the left of the ring. */
const CAPTION_ARC = 'M 20 68 A 68 68 0 0 1 136 47';

/**
 * The daily budget ring. The stroke represents what is *left* of the budget,
 * animated from derived data rather than drawn statically.
 */
export function DailyGoalRing({ remainingKcal, goalKcal }: DailyGoalRingProps): React.JSX.Element {
  const ratio = clamp01(goalKcal > 0 ? remainingKcal / goalKcal : 0);
  const progress = useRef(new Animated.Value(ratio)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: ratio,
      duration: motion.ring.duration,
      easing: Easing.bezier(x1, y1, x2, y2),
      useNativeDriver: false,
    }).start();
  }, [progress, ratio]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size.width} height={size.height}>
        <Defs>
          <Path id="goalArc" d={CAPTION_ARC} />
        </Defs>

        <SvgText
          fill={colors.textSecondary}
          fontSize={10}
          fontWeight="500"
          letterSpacing={0.4}
        >
          <TextPath href="#goalArc" startOffset="4%">
            {`${toPercent(ratio)}% of daily goal`}
          </TextPath>
        </SvgText>

        <G rotation={-90} origin={`${cx}, ${cy}`}>
          <Circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke={colors.ringTrack}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={cx}
            cy={cy}
            r={radius}
            stroke={colors.green}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>

      <View style={styles.readout} pointerEvents="none">
        <Text style={styles.value}>{formatNumber(remainingKcal)}</Text>
        <Text style={styles.unit}>kcal left</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: size.width,
    height: size.height,
  },
  readout: {
    position: 'absolute',
    top: 63,
    width: '100%',
    alignItems: 'center',
  },
  value: typography.ringValue,
  unit: {
    ...typography.ringUnit,
    marginTop: spacing.s1,
  },
});
