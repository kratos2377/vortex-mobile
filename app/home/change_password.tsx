import { handleChangePassword } from '@/api/change_password';
import { useUserStore } from '@/store/user_state';
import { HomeNavProps } from '@/utils/HomeParamList';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Appbar, 
  TextInput, 
  Button, 
  Surface, 
  Text,
  HelperText,
  useTheme,
  Snackbar
} from 'react-native-paper';

const ChangePasswordScreen = ({ navigation, route }: HomeNavProps<'change_password'>) => {
  const {user_details} = useUserStore()
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Validation states
  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validateInputs = () => {
    const newErrors = {
      currentPassword: !currentPassword,
      newPassword: newPassword.length < 8,
      confirmPassword: newPassword !== confirmPassword,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handlePasswordChange = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    
    let change_password_res = await handleChangePassword({
      user_id: user_details.id, 
      password: currentPassword,
      new_password: newPassword 
    })


    if(!change_password_res.result.success) {

      setSnackbarMessage(change_password_res.error_message!);
      setSnackbarVisible(true);

      setLoading(false);

      setTimeout(() => {
        setSnackbarVisible(false)
      } , 1000)
    } else {

      setSnackbarMessage("Password changed successfully");
      setSnackbarVisible(true);

      setLoading(false);

      setTimeout(() => {
        setSnackbarVisible(false)
        goBack()
      } , 1000)
      
      // Clear inputs
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }


  };

  const goBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} disabled={loading} />
        <Appbar.Content title="Change Password" />
      </Appbar.Header>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Surface style={styles.surface} elevation={2}>
            <Text style={styles.instructionText}>
              Please enter your current password and a new password below.
              New passwords must be at least 8 characters long.
            </Text>

            <TextInput
              label="Current Password"
              value={currentPassword}
              onChangeText={text => {
                setCurrentPassword(text);
                if (errors.currentPassword) {
                  setErrors({...errors, currentPassword: false});
                }
              }}
              secureTextEntry={!showCurrentPassword}
              right={
                <TextInput.Icon
                  icon={showCurrentPassword ? "eye-off" : "eye"}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              }
              style={styles.input}
              error={errors.currentPassword}
            />
            {errors.currentPassword && (
              <HelperText type="error">
                Please enter your current password
              </HelperText>
            )}

            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={text => {
                setNewPassword(text);
                if (errors.newPassword) {
                  setErrors({...errors, newPassword: false});
                }
              }}
              secureTextEntry={!showNewPassword}
              right={
                <TextInput.Icon
                  icon={showNewPassword ? "eye-off" : "eye"}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
              style={styles.input}
              error={errors.newPassword}
            />
            {errors.newPassword && (
              <HelperText type="error">
                Password must be at least 8 characters long
              </HelperText>
            )}

            <TextInput
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors({...errors, confirmPassword: false});
                }
              }}
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              style={styles.input}
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <HelperText type="error">
                Passwords do not match
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handlePasswordChange}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Change Password
            </Button>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 8,
  },
  instructionText: {
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
  },
});

export default ChangePasswordScreen;