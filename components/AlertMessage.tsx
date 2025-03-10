import { View } from 'react-native'
import {Text} from 'react-native-paper'
import React from 'react'


interface AlertProps {
    message: String,
    type: "success" | "error"
}

const AlertMessage = ( {message , type} : AlertProps) => {
  return (
    <View>
      <Text style={{padding: 2 , color: type==="success" ? "green" : "red"}} variant="titleMedium">{message}</Text>
    </View>
  )
}

export default AlertMessage