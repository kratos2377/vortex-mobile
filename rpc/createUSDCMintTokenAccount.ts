import { USDC_MINT_ADDRESS } from "@/constants/const";
import { useConnection } from "@/utils/ConnectionProvider";
import { useAuthorization } from "@/utils/useAuthorization";
import { transact, Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useCallback } from "react";


const {connection} = useConnection()
const {authorizeSession} = useAuthorization()

export const  createUSDCMintTokenForUser = useCallback(
    async (wallet_address: PublicKey) => {
      let signedTransactions = await transact(
        async (wallet: Web3MobileWallet) => {
          const [authorizationResult, latestBlockhash] = await Promise.all([
            authorizeSession(wallet),
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
