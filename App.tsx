import "./polyfills";
import React, { useMemo } from 'react';
import { useColorScheme } from './hooks/useColorScheme';
import BaseScreen from './app/base_screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { ClusterProvider } from './components/cluster/cluster-data-access';
import { ConnectionProvider } from './utils/ConnectionProvider';

export default function App() {
      const colorScheme = useColorScheme();
      const queryClient = new QueryClient()


  return (

    <QueryClientProvider client={queryClient}>

<ClusterProvider>
<ConnectionProvider  config={{ commitment: "processed" }}>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>


           <BaseScreen />

      
    </ThemeProvider>
    
      </PaperProvider>

      </ConnectionProvider>
    </ClusterProvider>


    </QueryClientProvider>
  );
}