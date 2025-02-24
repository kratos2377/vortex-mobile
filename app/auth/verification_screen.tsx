import { AuthNavProps } from '@/utils/AuthParamList'
import { OTPInput } from '../../components/OTPInput'
import React, { RefObject, useRef, useState } from 'react'
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
    
      <VStack
        mx="5px"
        p={10}
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="lg"
        spacing="md"
        bg="white"
      >

<KeyboardAvoidingView>
        <TouchableWithoutFeedback>
          <View className={"flex flex-col gap-y-4 p-4"}>
            <View className={"flex flex-col items-center mb-4"}>
              <Text className="mb-5 text-center text-2xl font-semibold text-white" mb="10px">
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
      </VStack>
    
      </SafeAreaView>
  )
}

export default VerificationScreen