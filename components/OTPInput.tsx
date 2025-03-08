import React, { RefObject } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Platform,
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData
} from 'react-native';
import { Text } from 'react-native-paper';

type OTPInputProps = {
  codes: string[];
  refs: RefObject<TextInput>[];
  errorMessages?: string[];
  onChangeCode: (text: string, index: number) => void;
};

export const OTPInput = ({ 
  codes, 
  refs, 
  errorMessages, 
  onChangeCode
}: OTPInputProps) => {
  const { width } = Dimensions.get('window');
  const inputWidth = Math.min(45, (width - 100) / 6);

  // Handle key press, including backspace for navigation
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    const key = e.nativeEvent.key;

    // If backspace is pressed and the current input is empty, focus on previous input
    if (key === 'Backspace' && !codes[index] && index > 0) {
      refs[index - 1]?.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        {Array(6).fill(0).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.inputContainer,
              { width: inputWidth, height: inputWidth * 1.5 },
              errorMessages && errorMessages.length > 0 ? styles.inputError : null,
              codes[index] ? styles.inputFilled : null
            ]}
          >
            <TextInput
              ref={refs[index]}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={codes[index]}
              onChangeText={(text) => onChangeCode(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              selectionColor="#6200ee"
              autoComplete="one-time-code"
              textContentType={Platform.OS === 'ios' ? 'oneTimeCode' : undefined}
              returnKeyType="next"
              blurOnSubmit={false}
              selectTextOnFocus
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    color: '#333',
    paddingHorizontal: 0,
  },
  inputError: {
    borderColor: 'red',
  },
  inputFilled: {
    borderColor: '#6200ee',
    backgroundColor: '#fff',
  },
});