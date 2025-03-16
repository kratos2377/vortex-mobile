import { useEffect, useState } from "react"
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  Alert
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Headline, 
  Paragraph, 
  Provider as PaperProvider, 
  DefaultTheme 
} from 'react-native-paper';

import React from "react"
import { AuthNavProps } from "@/utils/AuthParamList"
import { save_user_details } from "@/store/store";
import AlertMessage from "@/components/AlertMessage";
import { handleLoginCall } from "@/api/login_mutation";
import { useUserStore } from "@/store/user_state";
import { UserModel } from "@/store/models";
import { handleSendEmailMutation } from "@/api/send_email_mutation";



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};


export default function LoginScreen({ navigation, route }: AuthNavProps<'login'>)  {

  const { fn } = route.params
    const [requestSent , setRequestSent] = useState(false)
    const [usernameoremail , setUsernameOrEmail] = useState("")
    const [password , setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [usernameoremailError, setUsernameorEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword , setShowassword] = useState(false)
    const [showAlert , setShowAlert] = useState(false)
    const [message , setMessage] = useState("")
    const [type , setType] = useState<"success" | "error">("success")
    const {updateUserDetails} = useUserStore()


    const handleLoginFormCall = async () => {
        console.log("Handle Login Call")

        setRequestSent(true)
        setIsLoading(true)

        console.log("CREDS ARE")
        console.log(usernameoremail)
        console.log(password)


        let login_response = await handleLoginCall({
          usernameoremail: usernameoremail,
          pwd: password
        })

          if (!login_response.result.success) {

            console.log("LOGIN ERROR IS FROM HERE 1")
            setType("error")
            setMessage("Some Error Occured")
            setShowAlert(true)

            setTimeout(() => {
              setShowAlert(false)
            } , 1000)

          } else {

            let user_mod: UserModel = {
              id: login_response.data!.id,
              username: login_response.data!.username,
              email: login_response.data!.email,
              first_name: login_response.data!.first_name,
              last_name: login_response.data!.last_name,
              score: login_response.data!.score,
              verified: login_response.data!.verified
          }
   
            updateUserDetails(user_mod)
    

          //    await save_user_details(login.data.token , login.data.user.id)
              if (!login_response.data?.verified) {

         

                let send_email_res = await handleSendEmailMutation({
                  to_email: login_response.data!.email,
                  id: login_response.data!.id
                })
 

                if (!send_email_res.result.success) {
                  setType("error")
                  setMessage("Some Error Occured while sending verification code")
                  setShowAlert(true)

                  setTimeout(() => {
                    setShowAlert(false)
                  } , 1000)
    
                } else {


                  
                  setType("success")
                  setMessage("Login Successful! Redirecting to verification screen")
                  setShowAlert(true)

                  setTimeout(() => {
                    setShowAlert(false)
                    navigation.replace("verification_screen")
                  } , 1000)
  
                }

              
              } else {

                
              setType("success")
              setMessage("Login Successful!")
              setShowAlert(true)

                          setTimeout(() => {
                  setShowAlert(false)
                  fn()
                } , 1000)


              }
            
          }
         
          
          setRequestSent(false)
          setIsLoading(false)

    }




    return (
        
<PaperProvider theme={theme}>
<SafeAreaView style={styles.container}>
  <StatusBar barStyle="dark-content" backgroundColor="#fff" />
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.keyboardAvoidContainer}
  >
    <View style={styles.logoContainer}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} 
        style={styles.logo} 
        resizeMode="contain"
      />
    </View>
    
    <View style={styles.formContainer}>
      <Headline style={styles.headline}>Welcome Back</Headline>
      <Paragraph style={styles.paragraph}>
        Sign in to continue to your account
      </Paragraph>

    {showAlert ?   <AlertMessage message={message} type={type}/> : <></>}
      <TextInput
        label="Username or email"
        value={usernameoremail}
        onChangeText={ (value) => setUsernameOrEmail(value)}
        style={styles.input}
        error={!!usernameoremailError}
        mode="outlined"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
      />
      {usernameoremailError ? <Text style={styles.errorText}>{usernameoremailError}</Text> : <></>}

      <TextInput
        label="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={!showPassword}
        style={styles.input}
        mode="outlined"
        error={!!passwordError}
        autoCapitalize="none"
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => { setShowassword(!showPassword)}} />}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : <></>}

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={handleLoginFormCall}
        style={styles.loginButton}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </Button>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('registration')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
</SafeAreaView>
</PaperProvider>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paragraph: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 12,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6200ee',
  },
  loginButton: {
    padding: 5,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#888',
  },
  registerLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});