import { AuthNavProps } from '@/utils/AuthParamList'
import { OTPInput } from '../../components/OTPInput'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { 
  KeyboardAvoidingView, 
  SafeAreaView, 
  TextInput, 
  TouchableWithoutFeedback, 
  View, 
  StyleSheet, 
  Platform,
  Keyboard,
  StatusBar
} from 'react-native';
import { Surface, Text, Button } from "react-native-paper";
import { useUserStore } from '@/store/user_state';
import AlertMessage from '@/components/AlertMessage';
import { handleSendEmailMutation } from '@/api/send_email_mutation';
import { handleVerifyCodeMutation } from '@/api/verify_code_mutation';

const VerificationScreen = ({ navigation, route }: AuthNavProps<'verification_screen'>) => {
  const { fn } = route.params

  const {user_details , updateUserVerifiedStatus} = useUserStore()
    const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
    const refs: RefObject<TextInput>[] = [
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
    ];
  
    const [errorMessages, setErrorMessages] = useState<string[]>();
    const [isLoading , setIsLoading] = useState(false)


     // Timer states
    const [timeLeft, setTimeLeft] = useState(60);  // Initial time: 60 seconds
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [resendCount, setResendCount] = useState(0);
    const [timerDuration, setTimerDuration] = useState(60);  // Initial timer duration
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [showAlert , setShowAlert] = useState(false)
    const [message , setMessage] = useState("")
    const [type , setType] = useState<"success" | "error">("success")


    const onChangeCode = (text: string, index: number) => {
      // If pasting a full code
      if (text.length > 1) {
        setErrorMessages(undefined);
        const newCodes = text.split("").slice(0, 6);
        // Fill remaining slots with empty strings if pasted text is shorter than 6
        while (newCodes.length < 6) {
          newCodes.push("");
        }
        setCodes(newCodes);
        refs[5]?.current?.focus();
        return;
      }
  
      // Handle single digit input
      setErrorMessages(undefined);
      const newCodes = [...codes];
      newCodes[index] = text;
      setCodes(newCodes);
      
      // Auto-focus next input if text is entered
      if (text !== "" && index < 5) {
        refs[index + 1]?.current?.focus();
      }
      
      // Check if all codes are filled
      if (newCodes.every(code => code !== "") && index === 5) {
      //  Keyboard.dismiss();
      }
    };
  
  
    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && index > 0 && codes[index] === '') {
        refs[index - 1]?.current?.focus();
      }
    };


    //Add Verification and Code Resend API Calls

    const handleVerificationCall = async () => {


      if (codes.some(code => code === "")) {
        setErrorMessages(["Please enter all 6 digits of the verification code"]);
        return;
      }

      
      setIsLoading(true);
      

      let final_code = ""

      codes.map((el) => final_code += el )


      console.log("Final Code is")
      console.log(final_code)


      let verify_code_res = await handleVerifyCodeMutation({
        user_key: final_code,
        id: user_details.id
      })
      

      if (!verify_code_res.result.success) {

        setType("error")
        setMessage("Some Error Occured while verifying code")
        setShowAlert(true)

        setTimeout(() => {
          setShowAlert(false)
        } , 1000)

      } else {
        updateUserVerifiedStatus(true)
        setType("success")
        setMessage("Verification Successful.")
        setShowAlert(true)

        setTimeout(() => {
          setShowAlert(false)
          fn()
        } , 1000)



      }

      // Simulate verification API call
      setTimeout(() => {
        setIsLoading(false);
        // Here you would handle verification success
        // navigation.navigate('home'); // Navigate to home or next screen
      }, 900);


    }

    const handleResendCode = async () => {
      // Clear the current inputs
      if (resendCount >= 3) {
        alert("Maximum resend attempts reached. Please contact support.");
        return;
      }


      
    let send_email_res = await handleSendEmailMutation({
      to_email: user_details.email,
      id: user_details.id
                  })

      // Increase counter and reset codes
      setResendCount(prev => prev + 1);
      setCodes(Array(6).fill(""));
      
      // Calculate new timer duration
      const newDuration = 60 + (resendCount + 1) * 30;
      setTimerDuration(newDuration);
      setTimeLeft(newDuration);
      setIsTimerRunning(true);
      
      refs[0]?.current?.focus();
    };

    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };


    useEffect(() => {
      if (isTimerRunning && timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsTimerRunning(false);
      }
  
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [isTimerRunning, timeLeft]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Surface style={styles.surface}>
              <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>
                    Enter Verification Code
                  </Text>
                  <Text style={styles.subHeaderText}>
                    We've sent a 6-digit code to your email
                  </Text>
                </View>

                {showAlert ? <AlertMessage message={message} type={type}/> : <></>}
                
                <OTPInput
                  codes={codes}
                  errorMessages={errorMessages}
                  onChangeCode={onChangeCode}
                  refs={refs}
                />
                
                {errorMessages && errorMessages.length > 0 && (
                  <Text style={styles.errorText}>{errorMessages[0]}</Text>
                )}
                
                <Button
                  mode="contained"
                  style={styles.verifyButton}
                  loading={isLoading}
                  disabled={isLoading || codes.some(code => code === "")}
                  onPress={handleVerificationCall}
                >
                  Verify
                </Button>
                
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>
                    {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : ''}
                  </Text>
                </View>
                
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Didn't receive a code? </Text>
                  <TouchableWithoutFeedback 
                    onPress={handleResendCode}
                    disabled={isTimerRunning || resendCount >= 3}
                  >
                    <Text style={[
                      styles.resendLink, 
                      (isTimerRunning || resendCount >= 30) && styles.resendDisabled
                    ]}>
                      Resend{resendCount > 0 ? ` (${resendCount}/30)` : ''}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </Surface>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  verifyButton: {
    marginTop: 30,
    width: '100%',
    paddingVertical: 6,
  },
  timerContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  timerText: {
    color: '#666',
    fontSize: 14,
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
  },
  resendLink: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  resendDisabled: {
    color: '#a0a0a0',
    fontWeight: 'normal',
  },
});


export default VerificationScreen