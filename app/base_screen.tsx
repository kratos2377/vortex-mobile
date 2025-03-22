import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { getUserTokenFromStorage } from '../store/store';
import React from 'react';
import LoginScreen from './auth/login';
import Registration from './auth/registration';
import MainScreen from './home/main_screen';
import VerificationScreen from './auth/verification_screen';
import { AuthParamList } from '@/utils/AuthParamList';
import { HomeParamList } from '@/utils/HomeParamList';
import { useUserStore } from '@/store/user_state';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { handleVerifyTokenMutation } from '@/api/verify_token_mutation';
import { UserModel } from '@/store/models';
import ChangePasswordScreen from './home/change_password';
import BetScreen from './home/bet_screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function BaseScreen() {
  const Stack = createNativeStackNavigator<AuthParamList>();
  const MainStack = createNativeStackNavigator<HomeParamList>();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [loading , setLoading] = useState(true)

  const [isLoginRequired , setIsLoginRequired] = useState(false)
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

      let verify_token_res = await handleVerifyTokenMutation({
        token: token
      })


      if (!verify_token_res.result.success) {
        setIsLoginRequired(true)
      } else {


        if (verify_token_res.user_data.verified) {
          
          let user_mod: UserModel = {
            id: verify_token_res.user_data.id,
            username: verify_token_res.user_data.username,
            email: verify_token_res.user_data.email,
            first_name: verify_token_res.user_data.first_name,
            last_name: verify_token_res.user_data.last_name,
            score: verify_token_res.user_data.score,
            verified: verify_token_res.user_data.verified
        }
  
          updateUserDetails(user_mod)
              
          setIsLoginRequired(false)
        } else {
          setIsLoginRequired(true)
        }

      }

    }


    setTimeout(async () => {
      await SplashScreen.hideAsync();
    } , 1000)
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
      }}
      initialParams={{ fn: handleGetUserTokenFromStorage }}
      />
  

  <MainStack.Screen name="change_password" component={ChangePasswordScreen}   options={{
        headerShown: false
      }}
      />

<MainStack.Screen name="bet_screen" component={BetScreen}   options={{
        headerShown: false
      }}
      />
      </MainStack.Navigator>
      </NavigationContainer>

  );
}
