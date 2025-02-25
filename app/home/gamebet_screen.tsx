import { StyleSheet, Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import  React , {useEffect, useState} from "react"
import { useUserStore } from '../../store/user_state';
import { StatusBar } from 'expo-status-bar';
import AccountInfo from '../../components/AccountInfo';
import SignInButton from '../../components/SignInButton';
import { Appbar, Surface } from 'react-native-paper';
import { useAuthorization } from '@/utils/useAuthorization';
import { HomeNavProps } from '@/utils/HomeParamList';

export default function GameBetScreen({ navigation, route }: HomeNavProps<'gamebet_screen'>) {
    const {user_details} = useUserStore()
    const [walletCount , setWalletCount] = useState(0)
    const [currentWalletAddress , setCurrentWalletAddress] = useState("")
    const {accounts, selectedAccount} = useAuthorization();
    useEffect(() => {

      // console.log("Selected Account is")
      // console.log(selectedAccount)
      

    } , [])

  return (
   <SafeAreaView style={{width: "100%" , height:"100%"}}>

<Appbar.Header>
    <Appbar.Content title={selectedAccount ? `${selectedAccount.publicKey}` : "Select wallet"} onPress={() => {

      if(selectedAccount !== undefined && selectedAccount !== null) {
        console.log("Wallet key is")
        console.log(selectedAccount.publicKey)
      } 

    }}/>
    <Appbar.Action icon="wallet-plus-outline" onPress={() => {

    }} />
  </Appbar.Header>
     

            <ScrollView>
            <Surface>
            {accounts && selectedAccount ? (
          <AccountInfo
            accounts={accounts}
            onChange={() => {}}
            selectedAccount={selectedAccount}
          />
        ) : (
          <View style={styles.container}>
            <SignInButton mode="contained">
              Sign In
            </SignInButton>
          </View>
        )}
            </Surface>
            </ScrollView>
        

   </SafeAreaView>
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