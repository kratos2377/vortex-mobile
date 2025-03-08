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
  StatusBar
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
import { useLogin } from "../../api/login_mutation"
import { AuthNavProps } from "@/utils/AuthParamList"



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};


export default function LoginScreen({ navigation, route }: AuthNavProps<'login'>)  {
   
    const [requestSent , setRequestSent] = useState(false)
    const [usernameoremail , setUsernameOrEmail] = useState("")
    const [password , setPassword] = useState("")
    const login = useLogin()
    const [isLoading, setIsLoading] = useState(false);
    const [usernameoremailError, setUsernameorEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword , setShowassword] = useState(false)
    const handleLoginCall = async () => {
        console.log("Handle Login Call")

        setRequestSent(true)
        setIsLoading(true)

       let login_response = await login.mutate({
            usernameoremail: usernameoremail,
            password: password
          });



          // if (login_response.result.success) {

          // } else {

          // }
          


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
        onPress={handleLoginCall}
        style={styles.loginButton}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </Button>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('verification_screen')}>
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