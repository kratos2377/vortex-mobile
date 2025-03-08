import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';


import { getUserTokenFromStorage } from '../store/store';
import React from 'react';
import LoginScreen from './auth/login';
import Registration from './auth/registration';
import GameBetScreen from './home/gamebet_screen';
import ProfileScreen from './home/profile_screen';
import QRScannerScreen from './home/qr_scanner';
import MainScreen from './home/main_screen';
import VerificationScreen from './auth/verification_screen';
import { AuthParamList } from '@/utils/AuthParamList';
import { HomeParamList } from '@/utils/HomeParamList';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function BaseScreen() {
  const Stack = createNativeStackNavigator<AuthParamList>();
  const MainStack = createNativeStackNavigator<HomeParamList>();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoginRequired , setIsLoginRequired] = useState(false)


  const handleGetUserTokenFromStorage = async () => {
    let token = await getUserTokenFromStorage()
    console.log("Token recieved is")
    console.log(token)
    if(token === null || token === undefined || token === "") {
      console.log("Setting logging as true")
      //Disabling for now
      setIsLoginRequired(true)
    }

  }

  useEffect( () => {
    if (loaded) {

      handleGetUserTokenFromStorage()

      // setTimeout(() => {
        
      // SplashScreen.hideAsync();
      // } , 1000)
    }
  }, [loaded]);

  if(!loaded) {
    return null;
  }

  

  if(isLoginRequired) {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{
        headerShown: false
      }}>
  
  
        
              <Stack.Screen name="login" component={LoginScreen} options={{
        headerShown: false
      }}/>
        <Stack.Screen name="registration"  component={Registration} options={{
        headerShown: false
      }}/>
        <Stack.Screen name="verification_screen"  component={VerificationScreen} options={{
        headerShown: false
      }}/>
  
    
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
  
      </MainStack.Navigator>
      </NavigationContainer>

  );
}
