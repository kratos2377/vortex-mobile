import { StyleSheet, Image, Platform, SafeAreaView, ScrollView, View, RefreshControl } from 'react-native';
import  React , {useCallback, useEffect, useState} from "react"
import { useUserStore } from '../../store/user_state';
import { StatusBar } from 'expo-status-bar';
import AccountInfo from '../../components/AccountInfo';
import SignInButton from '../../components/SignInButton';
import { Appbar, Button, Menu, Modal, PaperProvider, Portal, Surface, useTheme , Text, ActivityIndicator } from 'react-native-paper';
import { Account, useAuthorization } from '@/utils/useAuthorization';
import { HomeNavProps } from '@/utils/HomeParamList';
import GameBetsList from '@/components/GameBetsCard';
import DisconnectButton from '@/components/DisconnectButton';
import { transact, Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { GAME_BET_ROUTE, GET_USER_BETS_ROUTE, NEBULA_BASE_URL } from '@/api/constants';
import { checkUsdcTokenAccountExists } from '@/rpc/mintTokenAccountCheck';
import { USDC_MINT_ADDRESS } from '@/constants/const';
import { useConnection } from '@/utils/ConnectionProvider';
import { PublicKey, Transaction } from '@solana/web3.js';
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import axios from 'axios';
import { GameBet } from '@/store/models';
import GameBetCard from '@/components/GameBetsCard';

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
      const [tokenAccountCreateModal , setTokenCreateModal] = useState(false)
      const {connection} = useConnection()
      const [isLoading , setIsLoading] = useState(false)
      const [gameBetsList , setGameBetsList] = useState<GameBet[]>([]) 
  const [refreshing, setRefreshing] = useState(false);
    const {accounts, selectedAccount , authorizeSessionWithSignIn , deauthorizeSession ,authorizeSession} = useAuthorization();


    const fetchUserBets = async () => {
      setIsLoading(true)
      if(selectedAccount === null || selectedAccount === undefined) {
        setTimeout(() => {
          setIsLoading(false)
        } , 1000)
        return []
      }


      try {
        const urlPath = NEBULA_BASE_URL + GAME_BET_ROUTE + GET_USER_BETS_ROUTE + "/" + user_details.id + "/" + 
        selectedAccount!.publicKey.toString() + "/" + pageNo.toString();



        const response = await axios.get(urlPath);

          if(response.status === 200 || response.status == 201) {
  
          // will set game bets here
            console.log("Game Bets response is")
            console.log(response.data.game_bets)
            setGameBetsList([...response.data.game_bets])
  
            setTimeout(() => {
              setIsLoading(false)
            } , 1000)
  
          } else {
            
            setTimeout(() => {
              setIsLoading(false)
            } , 1000)
            return []
          }
  
      } catch(err) {

        console.log("ERROR GOR GET CALL IS")
        console.log(err)
        setTimeout(() => {
          setIsLoading(false)
        } , 1000)
        return []
      }

    };



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


    

   


    const  createUSDCMintTokenForUser = useCallback(
      async (wallet_address: PublicKey) => {
        let signedTransactions = await transact(
          async (wallet: Web3MobileWallet) => {
            const [authorizationResult, latestBlockhash] = await Promise.all([
              deauthorizeSession(wallet),
              connection.getLatestBlockhash(),
            ]);
            
  
            
            let ata = await getAssociatedTokenAddress(
              USDC_MINT_ADDRESS, // mint
              wallet_address, // owner
            );
        
           let create_usdc_token_address_ix = createAssociatedTokenAccountInstruction(wallet_address , ata ,wallet_address, USDC_MINT_ADDRESS)
  
  
  
            const incrementTransaction = new Transaction({
              ...latestBlockhash,
              feePayer: authorizationResult.publicKey,
            }).add(create_usdc_token_address_ix);
  
            // Sign a transaction and receive
            const signedTransactions = await wallet.signTransactions({
              transactions: [incrementTransaction],
            });
  
            return signedTransactions[0];
          }
        );
  
        let txSignature = await connection.sendRawTransaction(
          signedTransactions.serialize(),
          {
            skipPreflight: true,
          }
        );
  
        const confirmationResult = await connection.confirmTransaction(
          txSignature,
          "confirmed"
        );
  
        if (confirmationResult.value.err) {
          throw new Error(JSON.stringify(confirmationResult.value.err));
        } else {
          console.log("Transaction successfully submitted!");
        }
      },
      [authorizeSession, connection]
    );

    const checkMintTokenAccountAndFetchBets = async () => {
      if(selectedAccount !== undefined && selectedAccount !== null) {
        let response = await checkUsdcTokenAccountExists(connection  , selectedAccount.publicKey.toString())
        console.log("RESPONSE for check usdc token account is")
        console.log(response)
        if (response.exists) {
          console.log("FETCHING BETS")
          fetchUserBets()
        } else {
          setTokenCreateModal(true)
          await createUSDCMintTokenForUser(selectedAccount.publicKey).then(() => {
            setTokenCreateModal(false)
            fetchUserBets()
          }).catch((err) => {
            return []
          })
        }
      }
    }

    const onRefresh =async  () => {
      setRefreshing(true);
      fetchUserBets()
      setTimeout(() => {

        setRefreshing(false);
      }, 2000);
    };


    useEffect(() => {
      checkMintTokenAccountAndFetchBets()
      } , [selectedAccount , pageNo])
  
  

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
     

            <Surface>
            {accounts && selectedAccount ? (
            
              isLoading ? <ActivityIndicator animating={true}/> :         gameBetsList.length === 0 ? <View style={{flex: 1 , justifyContent: "center"}}>
                <Text>No GameBets Found for this user and selected account</Text>
              </View> :     <ScrollView
              contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['grey']}
                  progressBackgroundColor={'black'}
                />
              }>
              {gameBetsList.map((item, index) => (
                <View key={item.id} style={styles.itemContainer}>
                  {/* Add game bet model component */}
                  <GameBetCard key={index + "_" + item.id} id={item.id} gameName={item.game_name} betAmount={item.bet_amount} status={item.status} wonStatus={item.won_status} createdAt={item.created_at} isGameValid={item.is_game_valid}/>
                </View>
              ))}
            </ScrollView>

        ) : (
          <View style={styles.container}>
            <SignInButton mode="contained">
              Sign In
            </SignInButton>
          </View>
        )}
            </Surface>
        

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
        <Modal visible={tokenAccountCreateModal} onDismiss={() => {}} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
        <ActivityIndicator animating={true} />
          <Text>Initializing USDC Token Account for selected address</Text>
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
            {accounts?.map(account => {
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
              <Text>Current Address is: {selectedAccount?.publicKey.toString()}</Text>
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

  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
  },
});

