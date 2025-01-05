import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';


import { getUserTokenFromStorage } from '@/store/mmkv_store';
import React from 'react';
import LoginScreen from './auth/index';
import HomeScreen from './home/home_screen';
import Registration from './auth/registration';
import { AuthParamList } from './utils/AuthParamList';
import { HomeParamList } from './utils/HomeParamList';
import PortfolioScreen from './home/portfolio_screen';
import ProfileScreen from './home/profile_screen';
import QRScannerScreen from './home/qr_scanner';
import SwapScreen from './home/swap_screen';
import MainScreen from './home/main_screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function BaseScreen() {
  const Stack = createNativeStackNavigator<AuthParamList>();
  const MainStack = createNativeStackNavigator<HomeParamList>();

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
        //Disabling for now
        //setIsLoginRequired(true)
      }


      setTimeout(() => {
        
      SplashScreen.hideAsync();
      } , 1000)
    }
  }, [loaded]);

  if(!loaded) {
    return null;
  }

  

  if(isLoginRequired) {
    return (
        <NavigationContainer>
        <Stack.Navigator>
  
  
        
              <Stack.Screen name="index" component={LoginScreen} />
        <Stack.Screen name="registration"  component={Registration}/>
  
    
        </Stack.Navigator>
        </NavigationContainer>
  
    )
  }

  return (
      <NavigationContainer>
      <MainStack.Navigator screenOptions={{
        headerShown: false
      }}>



        <MainStack.Screen name="main_screen" component={MainScreen}   options={{
        headerShown: false
      }}/>
        <MainStack.Screen name="home_screen" component={HomeScreen}  options={{
        headerShown: false
      }} />
        <MainStack.Screen name="portfolio_screen" component={PortfolioScreen} options={{
        headerShown: false
      }} />
        <MainStack.Screen name="profile_screen" component={ProfileScreen} options={{
        headerShown: false
      }}  />
        <MainStack.Screen name="qr_scanner" component={QRScannerScreen}  options={{
        headerShown: false
      }} />
        <MainStack.Screen name="swap_screen" component={SwapScreen}  options={{
        headerShown: false
      }}/>

  
      </MainStack.Navigator>
      </NavigationContainer>

  );
}
