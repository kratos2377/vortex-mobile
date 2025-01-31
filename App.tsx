import React from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from './hooks/useColorScheme';
import BaseScreen from './app/base_screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ThemeProvider as FicusThemeProvider } from 'react-native-ficus-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function App() {
      const colorScheme = useColorScheme();
      const queryClient = new QueryClient()
  return (
    
        <FicusThemeProvider> 
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>


      <QueryClientProvider client={queryClient}>
           <BaseScreen />
      </QueryClientProvider>

      
    </ThemeProvider>
    
    </FicusThemeProvider>
  );
}