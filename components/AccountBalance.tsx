import {useConnection} from '@solana/wallet-adapter-react';
import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from "react-native-ficus-ui"
import useSWR from 'swr';

type Props = Readonly<{
  publicKey: PublicKey;
}>;

export default function AccountBalance({publicKey}: Props) {
  const {connection} = useConnection();
  const balanceFetcher = useCallback(
    async function ([_, selectedPublicKey]: [
      'accountBalance',
      PublicKey,
    ]): Promise<number> {
      return await connection.getBalance(selectedPublicKey);
    },
    [connection],
  );
  const {data: lamports} = useSWR(
    ['accountBalance', publicKey],
    balanceFetcher,
    {
      suspense: true,
    },
  );
  const balance = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
        (lamports || 0) / LAMPORTS_PER_SOL,
      ),
    [lamports],
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