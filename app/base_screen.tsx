import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';


import { getUserTokenFromStorage } from '../store/store';
import React from 'react';
import LoginScreen from './auth/login';
import Registration from './auth/registration';
import MainScreen from './home/main_screen';
import VerificationScreen from './auth/verification_screen';
import { AuthParamList } from '@/utils/AuthParamList';
import { HomeParamList } from '@/utils/HomeParamList';
import { useVerifyTokenMutation } from '@/api/verify_token_mutation';
import { useUserStore } from '@/store/user_state';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function BaseScreen() {
  const Stack = createNativeStackNavigator<AuthParamList>();
  const MainStack = createNativeStackNavigator<HomeParamList>();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoginRequired , setIsLoginRequired] = useState(false)
  const verifyTokenMut = useVerifyTokenMutation()
  const {updateUserDetails} = useUserStore()
  const handleGetUserTokenFromStorage = async () => {
    let token = await getUserTokenFromStorage()
    console.log("Token recieved is")
    console.log(token)
    if(token === null || token === undefined || token === "") {
      console.log("Setting logging as true")
      //Disabling for now
      setIsLoginRequired(true)
    } else {

      verifyTokenMut.mutate({
        token: token
      })


      if (verifyTokenMut.error || !verifyTokenMut.data?.result) {
        setIsLoginRequired(true)
      } else {

        if (verifyTokenMut.data.user_data.verified) {

          updateUserDetails(verifyTokenMut.data.user_data)
        } else {
          setIsLoginRequired(true)
        }

      }

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
      }}
      initialParams={{ fn: handleGetUserTokenFromStorage }}
      />
        <Stack.Screen name="registration"  component={Registration} options={{
        headerShown: false
      }}/>
        <Stack.Screen name="verification_screen"  component={VerificationScreen} options={{
        headerShown: false
      }}
      
      initialParams={{ fn: handleGetUserTokenFromStorage }}
      />
  
    
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
