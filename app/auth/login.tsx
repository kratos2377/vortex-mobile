import { useEffect, useState } from "react"
import {  SafeAreaView, TouchableOpacity } from "react-native"
import React from "react"
import { useLogin } from "../../api/login_mutation"
import { AuthNavProps } from "@/utils/AuthParamList"
import { Button, Surface, TextInput } from "react-native-paper"
import {Text} from  "react-native-paper"


export default function LoginScreen({ navigation, route }: AuthNavProps<'login'>)  {
   
    const [requestSent , setRequestSent] = useState(false)
    const [usernameoremail , setUsernameOrEmail] = useState("")
    const [password , setPassword] = useState("")
    const login = useLogin()

    const handleLoginCall = async () => {
        console.log("Handle Login Call")

        setRequestSent(true)

        login.mutate({
            usernameoremail: usernameoremail,
            password: password
          });


    }


    useEffect(() => {
            console.log("LOGIN TANSTACK FN CALLED")

            if(login.isSuccess) {
                
            }
    } , [login])


    return (
        <SafeAreaView       style={{
            flexDirection: 'column',
            justifyContent: 'space-around', //Centered vertically
            flex: 1,
            backgroundColor: "linear-gradient(to left, #bdc3c7, #2c3e50)"
          }}>

            <Surface
              style={{
                marginHorizontal: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: "gray.200",
                borderRadius: 8,
                backgroundColor: "white"
              }}             
            >
            <SafeAreaView>
            <TextInput
            style={{
            margin: 5,
            borderColor: "blue.500"
            }}
            placeholder="Username or Email"
            onChangeText={ (value) => setUsernameOrEmail(value)}
            value={usernameoremail}
            />
            <TextInput
            style={{
              margin: 5,
              borderColor: "blue.500"
              }}
            placeholder="Password"
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
            value={password}
            />

        <Button  style={{marginTop: 5}} loading={requestSent} 
        icon="rightcircle"
    
        onPress={handleLoginCall}
        >
            Login
        </Button>

        <Surface style={{ marginTop: 10 , alignSelf: "center"}}>
              
        <Text>
            Don't have an account?   <TouchableOpacity disabled={requestSent} onPress={() => navigation.replace('registration')}>
    <Text style={{color: "blue.500"}}>Register</Text>
  </TouchableOpacity>
        </Text>
        </Surface>
            </SafeAreaView>
            </Surface>
      </SafeAreaView>
    )
}