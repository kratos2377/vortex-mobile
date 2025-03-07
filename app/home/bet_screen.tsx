import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, TextInput } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { AccountMeta, Connection, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js';
import { Program } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor"
import {
    transact,
    Web3MobileWallet,
  } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { useAuthorization } from '@/utils/useAuthorization';
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { USDC_MINT_ADDRESS, VORTEX_WALLET_ADDRESS } from '@/constants/const';
import { getGameAccountPublicKey, getGameVaultccountPublicKey, getPlayerBetAccountKey, getUserGameBetAccountKey, getVortexSignerKey, stringToBuffer, uint8ArrayToBuffer } from '@/rpc/pda';
import { HomeNavProps } from '@/utils/HomeParamList';
import { useUserStore } from '@/store/user_state';
import { Appbar, Button } from 'react-native-paper';


const BetScreen = ({ navigation, route }: HomeNavProps<'bet_screen'>) => {

    const {user_details} = useUserStore()
    const {game_id  , user_betting_on , user_who_is_betting , is_player , is_replay, bet_type} = route.params
    const { authorizeSession, selectedAccount } = useAuthorization();
    const [connection] = useState(
        () => new Connection("https://api.devnet.solana.com")
      );
      const [amount, setAmount] = useState('');
      const inputRef = useRef(null);
    
      const handleAmountChange = (text: string) => {
        // Remove any non-numeric characters except the decimal point
        const cleanedText = text.replace(/[^0-9.]/g, '');
        
        // Check if there's a decimal point
        if (cleanedText.includes('.')) {
          const parts = cleanedText.split('.');
          
          // Ensure there's only one decimal point
          if (parts.length > 2) {
            return;
          }
          
          // Limit to 3 decimal places
          if (parts[1] && parts[1].length > 3) {
            return;
          }
        }
        
        setAmount(cleanedText);
      };
    
      const handleStakePress = () => {
        // Handle stake functionality here
        console.log('Staking amount:', amount);
        // Add your logic for processing the payment
      };
    
      const handleBackPress = () => {
        // Go back to previous screen
        navigation.goBack();
      };
    
      

      const initializeGame = useCallback(
        async (program: Program , session_id: string) => {
          let signedTransactions = await transact(
            async (wallet: Web3MobileWallet) => {
              const [authorizationResult, latestBlockhash] = await Promise.all([
                authorizeSession(wallet),
                connection.getLatestBlockhash(),
              ]);
              

              let game_id_buffer = uint8ArrayToBuffer(game_id)
              let session_id_buffer = stringToBuffer(session_id)
  
              let gameContractPubkey = getGameAccountPublicKey(program.programId , game_id_buffer , session_id_buffer)
              let game_vault_key = getGameVaultccountPublicKey(program.programId , game_id_buffer , session_id_buffer)

              const userTokenAccount =  getAssociatedTokenAddressSync(USDC_MINT_ADDRESS , selectedAccount!.publicKey)
            
              const remainingAccounts = new Array<AccountMeta>();
              remainingAccounts.push({
                  pubkey: USDC_MINT_ADDRESS,
                  isWritable: false,
                  isSigner: false,
              })
          

              const initGameInstruction = await program.methods
                .initializeGame(game_id_buffer, session_id_buffer, new anchor.BN(0.1))
                .accounts({
                    game: gameContractPubkey,
                    gameMint: USDC_MINT_ADDRESS , 
                    gameVault: game_vault_key ,
                    userTokenAccount:  userTokenAccount , 
                    admin: selectedAccount!.publicKey,
                    vortexSigner: getVortexSignerKey(program.programId),
                    rent: SYSVAR_RENT_PUBKEY,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID
                })
                .remainingAccounts(remainingAccounts)
                .instruction();
    
              const incrementTransaction = new Transaction({
                ...latestBlockhash,
                feePayer: authorizationResult.publicKey,
              }).add(initGameInstruction);
    
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



      const initializePlayerBet = useCallback(
        async (program: Program , session_id: string , staked_amount: number) => {
          let signedTransactions = await transact(
            async (wallet: Web3MobileWallet) => {
              const [authorizationResult, latestBlockhash] = await Promise.all([
                authorizeSession(wallet),
                connection.getLatestBlockhash(),
              ]);
              

              let game_id_buffer = uint8ArrayToBuffer(game_id)
              let session_id_buffer = stringToBuffer(session_id)
              let user_betting_onIdBuffer = uint8ArrayToBuffer(user_details.id)

  
              let gameContractPubkey = getGameAccountPublicKey(program.programId , game_id_buffer , session_id_buffer)
              let playerBetcontract_key = getPlayerBetAccountKey(program.programId , game_id_buffer , user_betting_onIdBuffer , session_id_buffer)
            let userGameBetAccountKey = getUserGameBetAccountKey(program.programId , game_id_buffer , user_betting_onIdBuffer , selectedAccount!.publicKey, session_id_buffer)

              const userTokenAccount =  getAssociatedTokenAddressSync(USDC_MINT_ADDRESS , selectedAccount!.publicKey)
            

              let staked_amount_bn = new anchor.BN(staked_amount * (10**6))

              const remainingAccounts = new Array<AccountMeta>();
              remainingAccounts.push({
                  pubkey: USDC_MINT_ADDRESS,
                  isWritable: false,
                  isSigner: false,
              })
          

              const initPlayerBetInstruction = await program.methods
              .initializePlayerBet(game_id_buffer,
                user_betting_onIdBuffer,
                session_id_buffer,
                 staked_amount_bn)
                .accounts({
                    playerTotalBet: playerBetcontract_key, 
                    userBet: userGameBetAccountKey,
                    game: gameContractPubkey,
                    gameMint: USDC_MINT_ADDRESS , 
                    gameVault: getGameVaultccountPublicKey(program.programId , game_id_buffer , session_id_buffer),
                    userTokenAccount: userTokenAccount, 
                    admin: selectedAccount!.publicKey,
                    vortexWallet: VORTEX_WALLET_ADDRESS,
                    rent: SYSVAR_RENT_PUBKEY,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID
                })
                .remainingAccounts(remainingAccounts)
                .instruction();
    
              const incrementTransaction = new Transaction({
                ...latestBlockhash,
                feePayer: authorizationResult.publicKey,
              }).add(initPlayerBetInstruction);
    
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



      const initializeUserGameBet = useCallback(
        async (program: Program ,session_id: string,  staked_amount: number) => {
          let signedTransactions = await transact(
            async (wallet: Web3MobileWallet) => {
              const [authorizationResult, latestBlockhash] = await Promise.all([
                authorizeSession(wallet),
                connection.getLatestBlockhash(),
              ]);
              

              let game_id_buffer = uint8ArrayToBuffer(game_id)
              let session_id_buffer = stringToBuffer(session_id)
              let user_betting_onIdBuffer = uint8ArrayToBuffer(user_betting_on)

  
              let gameContractPubkey = getGameAccountPublicKey(program.programId , game_id_buffer , session_id_buffer)
              let playerBetcontract_key = getPlayerBetAccountKey(program.programId , game_id_buffer , user_betting_onIdBuffer , session_id_buffer)
            let userGameBetAccountKey = getUserGameBetAccountKey(program.programId , game_id_buffer , user_betting_onIdBuffer , selectedAccount!.publicKey, session_id_buffer)

              const userTokenAccount =  getAssociatedTokenAddressSync(USDC_MINT_ADDRESS , selectedAccount!.publicKey)
            

              let staked_amount_bn = new anchor.BN(staked_amount * (10**6))

              const remainingAccounts = new Array<AccountMeta>();
              remainingAccounts.push({
                  pubkey: USDC_MINT_ADDRESS,
                  isWritable: false,
                  isSigner: false,
              })
          

              const initUseraGameBetInstruction = await program.methods
              .userBet(game_id_buffer,
                user_betting_onIdBuffer,
                 session_id,
                 staked_amount_bn)
                .accounts({
                    userBet: userGameBetAccountKey,
                    playerTotalBet: playerBetcontract_key, 
                    game: gameContractPubkey,
                    gameVault: getGameVaultccountPublicKey(program.programId , game_id_buffer , session_id_buffer),
                    userTokenAccount: userTokenAccount, 
                    userBetWalletKey: selectedAccount!.publicKey,
                    rent: SYSVAR_RENT_PUBKEY,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID
                })
                .remainingAccounts(remainingAccounts)
                .instruction();
    
              const incrementTransaction = new Transaction({
                ...latestBlockhash,
                feePayer: authorizationResult.publicKey,
              }).add(initUseraGameBetInstruction);
    
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


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
      
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackPress}/>
      </Appbar.Header>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter Stake Amount</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.000"
              keyboardType="numeric"
              textAlign="right"
            />
            <Text style={styles.currencySymbol}>USD</Text>
          </View>
          
          <Button 
            mode="contained" 
            style={styles.stakeButton}
            onPress={handleStakePress}
          >
            Stake
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  stakeButton: {
    width: '100%',
    paddingVertical: 8,
  },
});

export default BetScreen