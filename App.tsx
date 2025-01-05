import React from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import BaseScreen from './app/base_screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ThemeProvider as FicusThemeProvider } from 'react-native-ficus-ui';


export default function App() {
      const colorScheme = useColorScheme();
  return (
    
        <FicusThemeProvider> 
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <BaseScreen />

      
    </ThemeProvider>
    
    </FicusThemeProvider>
  );
}