import { StyleSheet, Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import  React , {useEffect, useState} from "react"
import { HomeNavProps } from '../utils/HomeParamList';
import { useUserStore } from '../../store/user_state';
import { StatusBar } from 'expo-status-bar';
import { Box, Button, Icon, IconButton, ScrollBox, Text, VStack } from 'react-native-ficus-ui';
import useAuthorization from '../utils/useAuthorization';
import AccountInfo from '../../components/AccountInfo';
import SignInButton from '../../components/SignInButton';
import { Appbar } from 'react-native-paper';

export default function GameBetScreen({ navigation, route }: HomeNavProps<'gamebet_screen'>) {

    const {user_details} = useUserStore()
    const [walletCount , setWalletCount] = useState(0)
    const [currentWalletAddress , setCurrentWalletAddress] = useState("")
    const {accounts, onChangeAccount, selectedAccount} = useAuthorization();
    useEffect(() => {

      // console.log("Selected Account is")
      // console.log(selectedAccount)
      

    } , [])

  return (
   <Box w="100%" h="100%">

<Appbar.Header>
    <Appbar.Content title={`${user_details.email}`} onPress={() => {}}/>
    <Appbar.Action icon="wallet-plus-outline" onPress={() => {}} />
  </Appbar.Header>
     

            <ScrollBox>
            <VStack spacing="md">
            {accounts && selectedAccount ? (
          <AccountInfo
            accounts={accounts}
            onChange={onChangeAccount}
            selectedAccount={selectedAccount}
          />
        ) : (
          <View style={styles.container}>
            <SignInButton mode="contained">
              Sign In
            </SignInButton>
          </View>
        )}
            </VStack>
            </ScrollBox>
        

   </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  shell: {
    height: '100%',
  },
  spacer: {
    marginVertical: 16,
    width: '100%',
  },
  textInput: {
    width: '100%',
  },
});