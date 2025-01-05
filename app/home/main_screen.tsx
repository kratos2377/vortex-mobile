import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from './home_screen'
import SwapScreen from './swap_screen'
import QRScannerScreen from './qr_scanner'
import PortfolioScreen from './portfolio_screen'
import ProfileScreen from './profile_screen'
import { HomeNavProps } from '../utils/HomeParamList'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

const MainScreen = ({ navigation, route }: HomeNavProps<'main_screen'>) => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator initialRouteName="home_screen" screenOptions={ { 
        tabBarShowLabel: false
    }}>
    <Tab.Screen
      name="home_screen"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="hand-coin" color={color} size={26} />
        )
      }}
    />
    <Tab.Screen
      name="swap_screen"
      component={SwapScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="swap" color={color} size={26} />
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
      name="portfolio_screen"
      component={PortfolioScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Entypo
            name="wallet"
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