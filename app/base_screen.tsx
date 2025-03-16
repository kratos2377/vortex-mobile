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
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function BaseScreen() {
  const Stack = createNativeStackNavigator<AuthParamList>();
  const MainStack = createNativeStackNavigator<HomeParamList>();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [loading , setLoading] = useState(true)

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

      await verifyTokenMut.mutateAsync({
        token: token
      })


      if (verifyTokenMut.error) {
        setIsLoginRequired(true)
      } else {

        console.log("Verified mutation data is")
        console.log(verifyTokenMut.data)

        if (verifyTokenMut.data?.user_data.verified) {
          console.log("VERIFIED DATA IS")
          console.log(verifyTokenMut.data)
          updateUserDetails(verifyTokenMut.data.user_data)
          setIsLoginRequired(false)
        } else {
          console.log("SETTING IS LOGIN REQUIRED TRUE FROM HERE")
          setIsLoginRequired(true)
        }

      }

    }

    // console.log("SET IS LOGIN REQUIRED VALUE IS")
    // console.log(isLoginRequired)
    //setLoading(false)

  }

  useEffect( () => {
    if (loaded) {

      handleGetUserTokenFromStorage()

    }
  }, [loaded , loading]);

  if(!loaded) {
    return null;
  }


  // if(loading) {
  //   return (
  //     <View>
  //       <ActivityIndicator/>
  //     </View>
  //   )
  // }
  

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
