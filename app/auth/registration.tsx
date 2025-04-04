import React, { useState } from 'react';
import { 
  SafeAreaView,
  StyleSheet, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView
} from 'react-native';
import { 
  Button, 
  Surface, 
  TextInput, 
  Text, 
  Headline,
  Paragraph,
  PaperProvider,
  DefaultTheme
} from 'react-native-paper';
import { AuthNavProps } from '@/utils/AuthParamList';
import AlertMessage from '@/components/AlertMessage';
import { save_user_details } from '@/store/store';
import { handleSendEmailMutation } from '@/api/send_email_mutation';
import { handleUserRegistrationCall } from '@/api/registration_mutation';
import { UserModel } from '@/store/models';
import { useUserStore } from '@/store/user_state';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};


export default function Registration({ navigation, route }: AuthNavProps<'registration'>) {
  const [requestSent, setRequestSent] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Form validation states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  //Password visibility states
  const [showPassword , setShowPassword] = useState(false)
  const [showConfirmPassword , setShowConfirmPassword] = useState(false)


  const [showAlert , setShowAlert] = useState(false)
  const [message , setMessage] = useState("")
  const [type , setType] = useState<"success" | "error">("success")


  const {updateUserDetails} = useUserStore()


  const validateForm = () => {
    let isValid = true;

    // First icon validation
    if (!first_name.trim()) {
      setFirstNameError("First icon is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Last icon validation
    if (!last_name.trim()) {
      setLastNameError("Last icon is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Username validation
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleRegistrationFormCall = async () => {
    if (validateForm()) {
      setRequestSent(true);
      // Simulate API call



        let registration_res = await handleUserRegistrationCall({
          username: username,
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: confirmPassword
    })

          if (!registration_res.result.success) {
            setType("error")
            setMessage(registration_res.error_message)
            setShowAlert(true)

            setTimeout(() => {
              setShowAlert(false)
            } , 1000)


          } else {
              setType("success")
              setMessage("Registration Successful!")
              setShowAlert(true)

                let user_mod: UserModel = {
                  id: registration_res.user.id,
                  username: registration_res.user.username,
                  email: registration_res.user.email,
                  first_name: registration_res.user.first_name,
                  last_name: registration_res.user.last_name,
                  score: registration_res.user.score,
                  verified: registration_res.user.verified
              }
        
                updateUserDetails(user_mod)
                  

              
              setTimeout(() => {
                setShowAlert(false)
              } , 1000)
            //  await save_user_details(registration.data.token , registration.data.user.id)
              if (!registration_res.user.verified) {


                let send_email_res = await handleSendEmailMutation({
                               to_email: registration_res.user!.email,
                               id: registration_res.user!.id
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

                setTimeout(() => {
                  setShowAlert(false)
                } , 1000)

              }
            
          }
         
          
          setRequestSent(false)

      
    }
  };

  return (
   <PaperProvider theme={theme}>
     <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Surface style={styles.formContainer}>
            <Headline style={styles.headline}>Create Account</Headline>
            <Paragraph style={styles.paragraph}>
              Please fill in the details to register
            </Paragraph>

        {showAlert ?     <AlertMessage message={message} type={type}/> : <></>}

            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <TextInput
                  label="First Name"
                  placeholder="First Name"
                  mode="outlined"
                  value={first_name}
                  onChangeText={(value) => setFirstName(value)}
                  style={styles.input}
                  error={!!firstNameError}
                  left={<TextInput.Icon icon="account" />}
                />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : <></>}
              </View>

              <View style={styles.nameField}>
                <TextInput
                  label="Last Name"
                  placeholder="Last Name"
                  mode="outlined"
                  value={last_name}
                  onChangeText={(value) => setLastName(value)}
                  style={styles.input}
                  error={!!lastNameError}
                  left={<TextInput.Icon icon="account" />}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : <></>}
              </View>
            </View>

            <TextInput
              label="Email"
              placeholder="Email"
              mode="outlined"
              value={email}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              error={!!emailError}
              left={<TextInput.Icon icon="email" />}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : <></>}

            <TextInput
              label="Username"
              placeholder="Username"
              mode="outlined"
              value={username}
              onChangeText={(value) => setUsername(value)}
              autoCapitalize="none"
              style={styles.input}
              error={!!usernameError}
              left={<TextInput.Icon icon="account-circle" />}
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : <></>}

            <TextInput
              label="Password"
              placeholder="Password"
              mode="outlined"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.input}
              error={!!passwordError}
              left={<TextInput.Icon icon="lock" />}
              right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => {
                setShowPassword(!showPassword)
              }} />}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : <></>}

            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              style={styles.input}
              error={!!confirmPasswordError}
              left={<TextInput.Icon icon="lock-check" />}
              right={<TextInput.Icon icon={showConfirmPassword ? "eye" : "eye-off"} onPress={() => {  

                setShowConfirmPassword(!showConfirmPassword)
              }} />}
            />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : <></>}

            <Button
              mode="contained"
              loading={requestSent}
              onPress={handleRegistrationFormCall}
              style={styles.registerButton}
              icon="account-plus"
            >
              Register
            </Button>

            <View style={styles.loginContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
   </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  formContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paragraph: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameField: {
    flex: 1,
    marginRight: 8,
    width: '48%',
  },
  input: {
    marginBottom: 5,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  registerButton: {
    marginTop: 10,
    padding: 5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});