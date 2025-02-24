
import { useConnection } from '@/utils/ConnectionProvider';
import { useAuthorization } from '@/utils/useAuthorization';
import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

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

export default function AccountBalance({publicKey}: Props) {
  const { selectedAccount } = useAuthorization();
  const {connection} = useConnection();



  const query = useGetBalance({ address: selectedAccount!.publicKey });
  const balance = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
        (query.data || 0) / LAMPORTS_PER_SOL,
      ),
    [query.data],
  );
  return (
    <View style={styles.container}>
      <Text>Balance: </Text>
      <Text style={styles.currencySymbol} variant="headlineLarge">
        {'\u25ce'}
      </Text>
      <Text>{balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  currencySymbol: {
    marginRight: 4,
  },
});