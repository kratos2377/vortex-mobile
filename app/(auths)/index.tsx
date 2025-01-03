import { useNavigation } from "expo-router"
import { useState } from "react"
import {  SafeAreaView, TouchableOpacity } from "react-native"
import { Box, Button, Icon, Input, SafeAreaBox, VStack , Text } from "react-native-ficus-ui"
import { BorderlessButton } from "react-native-gesture-handler"



export default function LoginScreen()  {
    const navigation = useNavigation()
    const [requestSent , setRequestSent] = useState(false)
    const [usernameoremail , setUsernameOrEmail] = useState("")
    const [password , setPassword] = useState("")


    const handleLoginCall = async () => {
        console.log("Handle Login Call")

        setRequestSent(true)


        setTimeout(() => {
            setRequestSent(false)
        } , 3000)
    }


    return (
        <SafeAreaView       style={{
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
            <Input
            m="5px"
            placeholder="Username or Email"
            focusBorderColor="blue.500"
            onChangeText={ (value) => setUsernameOrEmail(value)}
            value={usernameoremail}
            />
            <Input
            m="5px"
            placeholder="Password"
            secureTextEntry
            focusBorderColor="blue.500"
            onChangeText={(value) => setPassword(value)}
            value={password}
            />

        <Button mt="5px" colorScheme="blue" full isLoading={requestSent} 
        suffix = {
            <Icon name="rightcircle" color="white" fontSize="xl" ml="sm" />
        }

        onPress={handleLoginCall}
        >
            Login
        </Button>

        <VStack spacing={5} mt="10px" alignSelf="center">
              
        <Text>
            Don't have an account?   <TouchableOpacity onPress={() => navigation.navigate('registration')}>
    <Text color="blue.500">Register</Text>
  </TouchableOpacity>
        </Text>
        </VStack>
            </Box>
            </VStack>
      </SafeAreaView>
    )
}