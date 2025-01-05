import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Box, SafeAreaBox , Text , Input , Button, Icon, TouchableOpacity, VStack, HStack } from 'react-native-ficus-ui'
import { AuthNavProps } from '../utils/AuthParamList'

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

  <VStack
    mx="5px"
    p={10}
    borderWidth={1}
    borderColor="gray.200"
    borderRadius="lg"
    spacing="md"
    bg="white"
  >
  <Box>


        <Box     

        style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                  }}>


                    <Box maxW="60vh">

                    <Input
                  placeholder="First Name"
                  focusBorderColor="blue.500"
                  onChangeText={ (value) => setFirstName(value)}
                  value={first_name}
                  />


                      </Box>

                    <Box maxW="60vh">
                    <Input
                  placeholder="Last Name"
                  focusBorderColor="blue.500"
                  onChangeText={ (value) => setLastName(value)}
                  value={last_name}
                  />

                    </Box>
        </Box>

<Input
          placeholder="Email"
          focusBorderColor="blue.500"
          onChangeText={ (value) => setEmail(value)}
          value={email}
          />

          <Input
          placeholder="Username"
          focusBorderColor="blue.500"
          onChangeText={ (value) => setUsername(value)}
          value={username}
          />
          <Input
          placeholder="Password"
          secureTextEntry
          focusBorderColor="blue.500"
          onChangeText={(value) => setPassword(value)}
          value={password}
          />


    <Input
          placeholder="Confirm Password"
          secureTextEntry
          focusBorderColor="blue.500"
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
          />

      <Button colorScheme="blue" full isLoading={requestSent} 
      suffix = {
          <Icon name="rightcircle" color="white" fontSize="xl" ml="sm" />
      }

      onPress={handleRegistrationCall}
      >
          Register
      </Button>

      <VStack spacing={5}>
            
      <Text>
          Already Have an account?   <TouchableOpacity onPress={() => navigation.replace('index')}>
  <Text color="blue.500">Login</Text>
</TouchableOpacity>
      </Text>
      </VStack>
          </Box>
  </VStack>

  </SafeAreaView>
  )
}

