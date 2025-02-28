import { StyleSheet, Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import  React , {useEffect, useState} from "react"
import { useUserStore } from '../../store/user_state';
import { StatusBar } from 'expo-status-bar';
import AccountInfo from '../../components/AccountInfo';
import SignInButton from '../../components/SignInButton';
import { Appbar, Button, Menu, Modal, PaperProvider, Portal, Surface, useTheme , Text } from 'react-native-paper';
import { Account, useAuthorization } from '@/utils/useAuthorization';
import { HomeNavProps } from '@/utils/HomeParamList';
import GameBetsList from '@/components/GameBetsList';
import DisconnectButton from '@/components/DisconnectButton';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { GAME_BET_ROUTE, GET_USER_BETS_ROUTE, NEBULA_BASE_URL } from '@/api/constants';
import { useQuery } from '@tanstack/react-query';

export default function GameBetScreen({ navigation, route }: HomeNavProps<'gamebet_screen'>) {
    const {user_details} = useUserStore()
    const {colors} = useTheme();
    const [walletCount , setWalletCount] = useState(0)
    const [currentWalletAddress , setCurrentWalletAddress] = useState("")
    const [showInfoModal , setShowInfoModal] = useState(false)
    const [showChangeAddressModal , setShowChangeAddressModal] = useState(false)
    const [disconnectModal , setDisconnectModal] = useState(false)
      const [menuVisible, setMenuVisible] = useState(false);
      const [pageNo , setPageNo] = useState(0)
    const {accounts, selectedAccount , authorizeSessionWithSignIn , deauthorizeSession} = useAuthorization();


    const fetchUserBets = async () => {
      if(selectedAccount === null || selectedAccount === undefined) {
        return []
      }

      const response = await fetch(NEBULA_BASE_URL + GAME_BET_ROUTE + GET_USER_BETS_ROUTE + "/" + user_details.id + "/" + 
        selectedAccount!.publicKey.toString() + "/" + pageNo.toString() );
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    };

    const { isLoading, isError, data, error , refetch } = useQuery({
      queryKey: ['game-bets' , pageNo , selectedAccount!.publicKey],
      queryFn: fetchUserBets,
    })
  

    const truncatePublickKeyString =  (pub_key: string) => {
      console.log("PUBKEY RECEIVED IS")
      console.log(pub_key)
      if (pub_key.length <= 10) {
        return pub_key;
      }
      
      const firstFour = pub_key.substring(0, 4);
      const lastFour = pub_key.substring(pub_key.length - 4);
      
      return `${firstFour}...${lastFour}`;
    }

    function getLabelFromAccount(account: Account) {
      const base58EncodedPublicKey = account.publicKey.toBase58();
      if (account.label) {
        return `${account.label} (${base58EncodedPublicKey.slice(0, 8)})`;
      } else {
        return base58EncodedPublicKey;
      }
    }


    

    useEffect(() => {

      if(selectedAccount !== undefined && selectedAccount !== null) {
        refetch()
      }
      

    } , [selectedAccount])

  return (
   <SafeAreaView style={{width: "100%" , height:"100%"}}>

<Appbar.Header>
    <Appbar.Content title={selectedAccount ? truncatePublickKeyString(selectedAccount.publicKey.toString()) : "Select wallet"} onPress={() => {

      if(selectedAccount !== undefined && selectedAccount !== null) {

      setShowChangeAddressModal(true)

      } 

    }}/>



    {
      accounts && selectedAccount ? (
        <>
        
        <Appbar.Action icon="cancel" onPress={() => {

          setDisconnectModal(true)

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
        

      <Portal>
        <Modal visible={showInfoModal} onDismiss={() => {setShowInfoModal(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <AccountInfo
            accounts={accounts!}
            onChange={() => {}}
            selectedAccount={selectedAccount!}

          />
        </Modal>
      </Portal>


      <Portal>
        <Modal visible={showChangeAddressModal} onDismiss={() => {setShowChangeAddressModal(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 10}}>

        <Menu
            anchor={
              <Button
                onPress={() => setMenuVisible(true)}
                style={styles.addressMenuTrigger}>
                Change Address
              </Button>
            }
            onDismiss={() => {
              setMenuVisible(false);
            }}
            style={styles.addressMenu}
            visible={menuVisible}>
            {accounts!.map(account => {
              const base58PublicKey = account.publicKey.toBase58();
              return (
                <Menu.Item
                  disabled={account.address === selectedAccount!.address}
                  style={styles.addressMenuItem}
                  contentStyle={styles.addressMenuItem}
                  onPress={() => {
                    //onChange(account);
                    setMenuVisible(false);
                  }}
                  key={base58PublicKey}
                  title={getLabelFromAccount(account)}
                />
              );
            })}
          </Menu>

        </Modal>
      </Portal>


      <Portal>
        <Modal visible={disconnectModal} onDismiss={() => {setDisconnectModal(false)}} contentContainerStyle={{backgroundColor: 'white', padding: 10}}>

            <View style={{marginBottom: 10}}>
              <Text>Current Address is: {selectedAccount!.publicKey.toString()}</Text>
            </View>


            <Button
            mode='contained'
            buttonColor={colors.error}
            onPress={() => {
              transact(async (wallet) => {
                await deauthorizeSession(wallet);
              });
            } }  >
              Disconnect
              </Button>


        </Modal>
      </Portal>

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
  addressMenu: {
    end: 18,
  },
  addressMenuItem: {
    maxWidth: '100%',
  },
  addressMenuTrigger: {
    marginBottom: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  labelIcon: {
    marginRight: 4,
    top: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  keyRow: {
    marginBottom: 12,
  },
});