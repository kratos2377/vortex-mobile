import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import QRScannerScreen from './qr_scanner'
import ProfileScreen from './profile_screen'
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import GameBetScreen from './gamebet_screen'
import { HomeNavProps } from '@/utils/HomeParamList'

const MainScreen = ({ navigation, route }: HomeNavProps<'main_screen'>) => {
    const Tab = createBottomTabNavigator()
    const { fn } = route.params
  return (
    <Tab.Navigator initialRouteName="gamebet_screen" screenOptions={ { 
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
        ),
        unmountOnBlur: true
      }}
    />


<Tab.Screen
      name="profile_screen"
      component={ProfileScreen}
      initialParams={{ fn: fn }}
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