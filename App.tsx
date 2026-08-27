import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DeviceFrame } from './src/components/DeviceFrame';
import { DashboardScreen } from './src/screens/DashboardScreen';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <DeviceFrame>
        <DashboardScreen />
      </DeviceFrame>
    </SafeAreaProvider>
  );
}
