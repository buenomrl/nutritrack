import { Platform, TextStyle, ViewStyle } from 'react-native';

/**
 * Design tokens taken verbatim from the design handoff.
 * Nothing in the UI layer hardcodes a colour, size or duration.
 */

export const colors = {
  green: '#34B24A',
  greenPressed: '#2C9C40',
  greenTint: '#EAF6EC',
  greenTintPressed: '#D6EEDB',
  greenBorder: '#C9E3CD',
  greenSurfaceTint: '#F7FBF8',

  headerGradientStart: '#E9F5EA',
  headerGradientEnd: '#E1F1E3',
  ringTrack: '#D2E8D6',

  textDisplay: '#14261A',
  textStrong: '#1F2A1F',
  textBody: '#2A312A',
  textSoft: '#3A423A',
  textSecondary: '#6E7A6E',
  textTertiary: '#7E877E',
  textSection: '#8E948E',
  textInactive: '#9AA09A',
  textPlaceholder: '#A0A6A0',

  surface: '#FFFFFF',
  appBackground: '#F3F3F1',
  cardBorder: '#EAEAE8',
  divider: '#F0F0EE',
  tabBarBorder: '#E6E6E6',
  barTrack: '#EDEDEB',
  glyphBorder: '#A8AEA8',
  grabber: '#E0E0DE',

  overlay: 'rgba(16, 20, 16, 0.32)',
} as const;

/** Spacing scale in pt, as specified in the handoff. */
export const spacing = {
  s1: 1,
  s2: 2,
  s3: 3,
  s4: 4,
  s5: 5,
  s6: 6,
  s7: 7,
  s8: 8,
  s9: 9,
  s10: 10,
  s11: 11,
  s12: 12,
  s13: 13,
  s14: 14,
  s15: 15,
  s16: 16,
  s18: 18,
  s20: 20,
  s26: 26,
} as const;

export const radii = {
  bar: 3,
  card: 8,
  sheet: 18,
  pill: 22,
  full: 999,
} as const;

const tabular: TextStyle = { fontVariant: ['tabular-nums'] };

export const typography = {
  appTitle: { fontSize: 27, fontWeight: '700', letterSpacing: -0.6, color: colors.textDisplay },
  ringValue: { fontSize: 31, fontWeight: '700', letterSpacing: -1, lineHeight: 34, color: colors.textDisplay, ...tabular },
  ringUnit: { fontSize: 10.5, fontWeight: '500', letterSpacing: 0.2, color: colors.textTertiary },

  macroLabel: { fontSize: 12, fontWeight: '600', letterSpacing: 0.1, color: colors.textStrong },
  macroValue: { fontSize: 11, fontWeight: '500', color: colors.textSecondary, ...tabular },

  tabLabel: { fontSize: 10.5, fontWeight: '700', letterSpacing: 0.9 },
  sectionLabel: { fontSize: 10.5, fontWeight: '700', letterSpacing: 1.1, color: colors.textSection },

  mealItem: { fontSize: 12.5, fontWeight: '500', color: colors.textBody, lineHeight: 17 },
  mealKcal: { fontSize: 12.5, fontWeight: '600', color: colors.textStrong, ...tabular },
  addMealLabel: { fontSize: 12, fontWeight: '600', color: colors.textSoft },

  historyLabel: { fontSize: 12.5, fontWeight: '600', color: colors.textBody },
  historyValue: { fontSize: 11.5, fontWeight: '500', color: colors.textSecondary, ...tabular },

  searchPlaceholder: { fontSize: 12.5, fontWeight: '500', color: colors.textPlaceholder },
  foodName: { fontSize: 12.5, fontWeight: '600', color: colors.textBody },
  foodServing: { fontSize: 10.5, fontWeight: '500', color: colors.textSection },
  foodKcal: { fontSize: 12, fontWeight: '500', color: colors.textSecondary, ...tabular },

  settingLabel: { fontSize: 12.5, fontWeight: '500', color: colors.textBody },
  settingValue: { fontSize: 12, fontWeight: '500', color: colors.textTertiary, ...tabular },

  primaryButton: { fontSize: 11.5, fontWeight: '700', letterSpacing: 1.2, color: colors.surface },

  sheetTitle: { fontSize: 14, fontWeight: '700', letterSpacing: -0.2, color: colors.textDisplay },
  sheetItemName: { fontSize: 12.5, fontWeight: '600', color: colors.textBody },
  sheetItemKcal: { fontSize: 12, fontWeight: '500', color: colors.textSecondary, ...tabular },
  sheetCancel: { fontSize: 12, fontWeight: '600', color: colors.textSection },
} satisfies Record<string, TextStyle>;

/** box-shadow on iOS/web, elevation on Android. */
export const shadows = {
  card: Platform.select<ViewStyle>({
    android: { elevation: 1 },
    default: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
  }) as ViewStyle,
  plusCircle: Platform.select<ViewStyle>({
    android: { elevation: 2 },
    default: {
      shadowColor: colors.green,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 6,
    },
  }) as ViewStyle,
  pill: Platform.select<ViewStyle>({
    android: { elevation: 4 },
    default: {
      shadowColor: colors.green,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.32,
      shadowRadius: 12,
    },
  }) as ViewStyle,
} as const;

/** Durations in ms; easings are applied with Easing.bezier(...) at the call site. */
export const motion = {
  ring: { duration: 550, bezier: [0.4, 0, 0.2, 1] },
  bar: { duration: 500, bezier: [0.4, 0, 0.2, 1] },
  sheet: { duration: 280, bezier: [0.2, 0.8, 0.2, 1] },
  backdrop: { duration: 200 },
} as const;

/** The design frame: 393 x 852 pt (iPhone 14/15 logical size). */
export const layout = {
  frameWidth: 393,
  frameHeight: 852,
  ring: { size: { width: 168, height: 172 }, cx: 84, cy: 91, radius: 52, strokeWidth: 11 },
  progressBarHeight: 6,
} as const;
