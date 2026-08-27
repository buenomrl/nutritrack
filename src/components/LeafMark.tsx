import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';

/** The leaf next to the wordmark: a 15 pt square with two opposite corners rounded. */
export function LeafMark(): React.JSX.Element {
  return <View style={styles.leaf} />;
}

const styles = StyleSheet.create({
  leaf: {
    width: 15,
    height: 15,
    backgroundColor: colors.green,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    transform: [{ rotate: '-32deg' }],
    marginTop: spacing.s2,
  },
});
