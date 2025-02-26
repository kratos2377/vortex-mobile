
import { USDC_MINT_ADDRESS, USDC_MINT_TOKEN_DECIMALS } from '@/constants/const';
import { useConnection } from '@/utils/ConnectionProvider';
import { useAuthorization } from '@/utils/useAuthorization';
import { getAssociatedTokenAddress, getAssociatedTokenAddressSync } from '@solana/spl-token';
import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from "react-native-paper"

type Props = Readonly<{
  publicKey: PublicKey;
}>;


export function useGetBalance({ address }: { address: PublicKey }) {
 
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["get-balance", { endpoint: connection.rpcEndpoint, address }],
    queryFn: () => connection.getBalance(address),
  });
}

const getUSDCWalletBalance = (pubkey: PublicKey) => {
  const { connection } = useConnection();

  const usdcWalletAddress = getAssociatedTokenAddressSync(
    USDC_MINT_ADDRESS, // mint
    pubkey, // owner
  );

  console.log("USDC ACCOUNT ADDRESS IS")
  console.log(usdcWalletAddress)


  return useQuery({
    queryKey: ["get-usdc-balance", { endpoint: connection.rpcEndpoint, usdcWalletAddress }],
    queryFn: () => connection.getTokenAccountBalance(usdcWalletAddress)
  });
}

export default function AccountBalance({publicKey}: Props) {
  const { selectedAccount } = useAuthorization();
  const {connection} = useConnection();



  let usdcWalletBalanceQuery =  getUSDCWalletBalance( selectedAccount!.publicKey )

  console.log("USDC WALLET BALANCE IS")
  console.log(usdcWalletBalanceQuery)

  const query = useGetBalance({ address: selectedAccount!.publicKey });
  const balance = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
        (query.data || 0) / LAMPORTS_PER_SOL,
      ),
    [query.data],
  );

  const usdcBalance = useMemo(
    () => usdcWalletBalanceQuery.data?.value.uiAmountString,
    [usdcWalletBalanceQuery.data],
  );
  return (
    <View style={{alignItems: "center" , display: "flex" , flexDirection:"column"}}>
          <View style={styles.container}>
      <Text>Sol Balance: </Text>
      <Text style={styles.currencySymbol} variant="headlineLarge">
        {'\u25ce'}
      </Text>
      <Text>{balance}</Text>
    </View>


    <View style={styles.container}>
      <Text>USDC Balance: </Text>
      <Text style={styles.currencyUSDCSymbol} variant="headlineLarge">
        {'\u0024'}
      </Text>
      <Text>{usdcBalance}</Text>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5
  },
  currencySymbol: {
    marginRight: 4,
  },
  currencyUSDCSymbol: {
    marginRight: 4,
    fontSize: 20
  },
});