import { AuthNavProps } from '@/utils/AuthParamList'
import React, { useState } from 'react'
import { SafeAreaView , StyleSheet, TouchableOpacity} from 'react-native'
import { Button, Surface, TextInput } from 'react-native-paper'
import {Text} from "react-native-paper"


export default function Registration({ navigation, route }: AuthNavProps<'registration'>) {

      const [requestSent , setRequestSent] = useState(false)
      const [first_name , setFirstName] = useState("")
      const [last_name , setLastName] = useState("")
      const [email , setEmail] = useState("")
      const [username , setUsername] = useState("")
      const [password , setPassword] = useState("")
      const [confirmPassword , setConfirmPassword] = useState("")
  
  
      const handleRegistrationCall = async () => {
          console.log("Handle Registration Call")
  
          setRequestSent(true)
  
  
          setTimeout(() => {
              setRequestSent(false)
          } , 3000)
      }
  

  return (
  <SafeAreaView  style={{
    flexDirection: 'column',
    justifyContent: 'space-around', //Centered vertically
    flex: 1,
    backgroundColor: "linear-gradient(to left, #bdc3c7, #2c3e50)"
  }}>

<Surface style={styles.vstack} children={<></>}/>
  <SafeAreaView>


        <SafeAreaView     

        style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                  }}>


                    <SafeAreaView style={{ maxWidth: "60%"}}>

                    <TextInput
                  placeholder="First Name"
                  
                  onChangeText={ (value) => setFirstName(value)}
                  value={first_name}
                  />


                      </SafeAreaView>

                    <SafeAreaView style={{maxWidth: "60%"}}>
                    <TextInput
                  placeholder="Last Name"
                  
                  onChangeText={ (value) => setLastName(value)}
                  value={last_name}
                  />

                    </SafeAreaView>
        </SafeAreaView>

<TextInput
          placeholder="Email"
          
          onChangeText={ (value) => setEmail(value)}
          value={email}
          />

          <TextInput
          placeholder="Username"
          
          onChangeText={ (value) => setUsername(value)}
          value={username}
          />
          <TextInput
          placeholder="Password"
          secureTextEntry
          
          onChangeText={(value) => setPassword(value)}
          value={password}
          />


    <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
          />

      <Button  loading={requestSent} 
      icon="rightcircle"
        onPress={handleRegistrationCall}
      >
          Register
      </Button>

    
            
      <Text>
          Already Have an account?   <TouchableOpacity onPress={() => navigation.replace('login')}>
  <Text style={{color: "blue.500"}}>Login</Text>
</TouchableOpacity>
      </Text>
          </SafeAreaView>

  </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  vstack: {
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Equivalent to gray.200
    borderRadius: 8, // 'lg' is typically around 8
    gap: 10, // Equivalent to spacing="md"
    backgroundColor: 'white',
    elevation: 1,
  },
});
