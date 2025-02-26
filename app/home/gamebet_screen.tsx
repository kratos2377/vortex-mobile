import { StyleSheet, Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import  React , {useEffect, useState} from "react"
import { useUserStore } from '../../store/user_state';
import { StatusBar } from 'expo-status-bar';
import AccountInfo from '../../components/AccountInfo';
import SignInButton from '../../components/SignInButton';
import { Appbar, Modal, PaperProvider, Portal, Surface } from 'react-native-paper';
import { useAuthorization } from '@/utils/useAuthorization';
import { HomeNavProps } from '@/utils/HomeParamList';
import GameBetsList from '@/components/GameBetsList';

export default function GameBetScreen({ navigation, route }: HomeNavProps<'gamebet_screen'>) {
    const {user_details} = useUserStore()
    const [walletCount , setWalletCount] = useState(0)
    const [currentWalletAddress , setCurrentWalletAddress] = useState("")
    const [showInfoModal , setShowInfoModal] = useState(false)
    const {accounts, selectedAccount , authorizeSessionWithSignIn} = useAuthorization();
    useEffect(() => {

      // console.log("Selected Account is")
      // console.log(selectedAccount)
      

    } , [])


    const truncatePublickKeyString = async (pub_key: string) => {
      if (pub_key.length <= 10) {
        return pub_key;
      }
      
      const firstFour = pub_key.substring(0, 4);
      const lastFour = pub_key.substring(pub_key.length - 4);
      
      return `${firstFour}...${lastFour}`;
    }

  return (
   <SafeAreaView style={{width: "100%" , height:"100%"}}>

<Appbar.Header>
    <Appbar.Content title={selectedAccount ? `${truncatePublickKeyString(selectedAccount.publicKey.toString())}` : "Select wallet"} onPress={() => {

      if(selectedAccount !== undefined && selectedAccount !== null) {
        console.log("Wallet key is")
        console.log(selectedAccount.publicKey)
      } 

    }}/>



    {
      accounts && selectedAccount ? (
        <>
        
        <Appbar.Action icon="cancel" onPress={() => {
            } } />
            
            <Appbar.Action icon="information-outline" onPress={() => {

              setShowInfoModal(true)

            } } />
            
            </> 
      )  : <Appbar.Action icon="wallet-plus-outline" onPress={() => {

      }} />
    }
  </Appbar.Header>
     

            <ScrollView>
            <Surface>
            {accounts && selectedAccount ? (
            
                <GameBetsList/>

        ) : (
          <View style={styles.container}>
            <SignInButton mode="contained">
              Sign In
            </SignInButton>
          </View>
        )}
            </Surface>
            </ScrollView>
        

            <PaperProvider>
      <Portal>
        <Modal visible={showInfoModal} onDismiss={() => {setShowInfoModal(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </PaperProvider>

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