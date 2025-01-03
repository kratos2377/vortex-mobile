import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ThemeProvider as FicusThemeProvider } from 'react-native-ficus-ui';

import { useColorScheme } from '@/hooks/useColorScheme';
import { getUserTokenFromStorage } from '@/store/mmkv_store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoginRequired , setIsLoginRequired] = useState(false)

  useEffect(() => {
    if (loaded) {

      let token =  getUserTokenFromStorage()
      console.log("Token recieved is")
      console.log(token)
      if(token === null || token === undefined || token === "") {
        console.log("Setting logging as true")
   //     setIsLoginRequired(true)
      }


      setTimeout(() => {
        
      SplashScreen.hideAsync();
      } , 1000)
    }
  }, [loaded]);

  if(!loaded) {
    return null;
  }

  if (isLoginRequired) {
    console.log("Returning this auth stack")
    return (
      <FicusThemeProvider> 
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auths)" options={{ headerShown: true }} />
          <Stack.Screen name="+not-found" />
        
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      
      </FicusThemeProvider>
    );
  }


  console.log("REACHED HERE IN NON AUTH STACK")
  return (
    <FicusThemeProvider> 
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    
    </FicusThemeProvider>
  );
}
