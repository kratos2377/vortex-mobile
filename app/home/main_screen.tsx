import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from './home_screen'
import SwapScreen from './swap_screen'
import QRScannerScreen from './qr_scanner'
import ProfileScreen from './profile_screen'
import { HomeNavProps } from '../utils/HomeParamList'
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import GameBetScreen from './gamebet_screen'

const MainScreen = ({ navigation, route }: HomeNavProps<'main_screen'>) => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator initialRouteName="home_screen" screenOptions={ { 
        tabBarShowLabel: false,
        headerShown: false
    }}>

<Tab.Screen
      name="gamebet_screen"
      component={GameBetScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name="gamepad"
            color={color}
            size={26}
          />
        )
      }}
    />

    <Tab.Screen
      name="qr_scanner"
      component={QRScannerScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="qrcode-scan"
            color={color}
            size={26}
          />
        )
      }}
    />


<Tab.Screen
      name="profile_screen"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="face-man-profile"
            color={color}
            size={26}
          />
        )
      }}
    />
  </Tab.Navigator>
  )
}

export default MainScreen