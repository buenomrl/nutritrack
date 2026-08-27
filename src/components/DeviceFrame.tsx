import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { layout } from '../theme';

interface DeviceFrameProps {
  children: React.ReactNode;
}

/**
 * Web-only presentation shell — it keeps the app at its 393 x 852 pt design
 * frame instead of stretching across a desktop window. On iOS and Android the
 * children are rendered untouched.
 */
export function DeviceFrame({ children }: DeviceFrameProps): React.JSX.Element {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.page}>
      <View style={styles.frame}>{children}</View>
    </View>
  );
}

const WEB_PAGE_BACKGROUND = '#E7E7E2';
const WEB_FRAME_RADIUS = 40;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WEB_PAGE_BACKGROUND,
  },
  frame: {
    width: layout.frameWidth,
    height: layout.frameHeight,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: WEB_FRAME_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.18,
    shadowRadius: 48,
  },
});
