import { AuthNavProps } from '@/utils/AuthParamList'
import { OTPInput } from '../../components/OTPInput'
import React, { RefObject, useRef, useState } from 'react'
import {Surface, Text} from "react-native-paper"
import { KeyboardAvoidingView, SafeAreaView, TextInput, TouchableWithoutFeedback, View } from 'react-native'

const VerificationScreen = ({ navigation, route }: AuthNavProps<'verification_screen'>) => {


    const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(""));
    const refs: RefObject<TextInput>[] = [
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
      useRef<TextInput>(null),
    ];
  
    const [errorMessages, setErrorMessages] = useState<string[]>();


    const onChangeCode = (text: string, index: number) => {
        if (text.length > 1) {
          setErrorMessages(undefined);
          const newCodes = text.split("");
          setCodes(newCodes);
          refs[5]!.current?.focus();
          return;
        }
        setErrorMessages(undefined);
        const newCodes = [...codes!];
        newCodes[index] = text;
        setCodes(newCodes);
        if (text !== "" && index < 6) {
          refs[index + 1]!.current?.focus();
        }
      };

    const handleVerificationCall = async () => {

    }

  return (
    <SafeAreaView  style={{
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
          borderRadius: 5,
          backgroundColor: "white",
        }}
      >

<KeyboardAvoidingView>
        <TouchableWithoutFeedback>
          <View style={{flex: 1,  flexDirection: "column" , padding: 4}}>
            <View style={{flex:1 , flexDirection: "column", marginBottom: 4, alignItems: "center"}}>
              <Text style={{  marginBottom: 10 , textAlign: "center" , fontSize: 24, fontWeight: "600",
                textDecorationColor: "white" }}>
                Enter verification code. 
              </Text>
         
            </View>
            <OTPInput
                              codes={codes!}
                              errorMessages={errorMessages}
                              onChangeCode={onChangeCode}
                              refs={refs}         />
            </View>
            </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
      </Surface>
    
      </SafeAreaView>
  )
}

export default VerificationScreen