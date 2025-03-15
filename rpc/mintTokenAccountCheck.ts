import { USDC_MINT_ADDRESS } from "@/constants/const";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";


export async function checkUsdcTokenAccountExists(
    connection: Connection,
    walletAddress: string,
  ): Promise<{exists: boolean, tokenAccountAddress?: string}> {
    try {
      // Convert string addresses to PublicKey objects
      const walletPubkey = new PublicKey(walletAddress);
  
      // Derive the associated token account address
      const associatedTokenAddress = await PublicKey.findProgramAddress(
        [
          walletPubkey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          USDC_MINT_ADDRESS.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
  
      // Get the token account info
      const tokenAccountInfo = await connection.getAccountInfo(associatedTokenAddress[0]);

      console.log("Account response is")
      console.log(tokenAccountInfo)
      
      // If the account info exists, the token account exists
      return {
        exists: tokenAccountInfo !== null,
        tokenAccountAddress: associatedTokenAddress[0].toString()
      };
    } catch (error) {
      console.error('Error checking USDC token account:', error);
      return { exists: false };
    }
  }