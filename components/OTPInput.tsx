import * as React from "react"
import { useState, type RefObject } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface OTPInputProps {
  codes: string[];
  refs: RefObject<TextInput>[];
  errorMessages: string[] | undefined;
  onChangeCode: (text: string, index: number) => void;
}

interface OTPInputConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  errorColor: string;
  focusColor: string;
}

export function OTPInput({
  codes,
  refs,
  errorMessages,
  onChangeCode,
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    input: {
      fontSize: 16,
      height: 48,
      width: 48,
      borderRadius: 8,
      textAlign: "center",
      backgroundColor: '#ffffff',
      color: "#000000",
      borderColor: "#000000",
      borderWidth: 2,
    },
    errorInput: {
      borderColor: "#e60517",
      color: "#f7ec1b",
    },
    focusedInput: {
      borderColor: "#1bf7f4",
    }
  });

  const handleFocus = (index: number) => setFocusedIndex(index);
  const handleBlur = () => setFocusedIndex(null);

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          key={index}
          autoComplete="one-time-code"
          enterKeyHint="next"
          style={[
            styles.input, 
            errorMessages && styles.errorInput,
            focusedIndex === index && styles.focusedInput,
          ]}
          onChangeText={(text) => onChangeCode(text, index)}
          value={code}
          onFocus={()=> handleFocus(index)}
          onBlur={handleBlur}
          maxLength={index === 0 ? codes.length : 1}
          ref={refs[index]}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === "Backspace" && index > 0) {
              onChangeCode("", index);
              refs[index - 1]!.current!.focus();
            }
          }}
        />
      ))}
    </View>
  );
}