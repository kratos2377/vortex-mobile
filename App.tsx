import "./polyfills";
import React, { useMemo } from 'react';
import BaseScreen from './app/base_screen';
import { StyleSheet, useColorScheme, View } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider, Text } from 'react-native-paper';
import { ClusterProvider } from './components/cluster/cluster-data-access';
import { ConnectionProvider } from './utils/ConnectionProvider';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export default function App() {
      const colorScheme = useColorScheme();
      const queryClient = new QueryClient()
  console.log("REACHING TILL HJERE IN APP")

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  return (

    <QueryClientProvider client={queryClient}>

<ClusterProvider>
<ConnectionProvider  config={{ commitment: "processed" }}>

<SafeAreaView
            style={[
              styles.shell,
              {
                backgroundColor:
                  colorScheme === "dark"
                    ? MD3DarkTheme.colors.background
                    : MD3LightTheme.colors.background,
              },
            ]}
          >
      <PaperProvider   theme={
                colorScheme === "dark"
                  ? CombinedDarkTheme
                  : CombinedDefaultTheme
              }>


                <BaseScreen/>
      
    
      </PaperProvider>

      </SafeAreaView>

      </ConnectionProvider>
    </ClusterProvider>


    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});
