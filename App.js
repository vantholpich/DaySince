import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <HomeScreen />
    </View>
  );
}
