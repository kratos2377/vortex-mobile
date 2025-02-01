import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from './hooks/useColorScheme';
import BaseScreen from './app/base_screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ThemeProvider as FicusThemeProvider } from 'react-native-ficus-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";
import { Buffer } from "buffer";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { DEVNET_ENDPOINT } from './rpc/constants';
import { createDefaultAddressSelector, createDefaultAuthorizationResultCache, createDefaultWalletNotFoundHandler, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { PaperProvider } from 'react-native-paper';
global.Buffer = Buffer;


class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

(() => {
  if (typeof crypto === "undefined") {
    Object.defineProperty(window, "crypto", {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();

export default function App() {
      const colorScheme = useColorScheme();
      const queryClient = new QueryClient()

      const wallets = useMemo(
        () => [
            new SolanaMobileWalletAdapter({
                addressSelector: createDefaultAddressSelector(),
                appIdentity: {
                    name: 'vortex',
                    uri: 'https://myapp.io',
                    icon: 'relative/path/to/icon.png',
                },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                cluster: "devnet",
                onWalletNotFound: createDefaultWalletNotFoundHandler(),
            }),
            
        ],
        [],
    );

  return (
        <ConnectionProvider  config={{commitment: 'processed'}}
        endpoint={DEVNET_ENDPOINT}>
        <WalletProvider wallets={wallets}>
      <PaperProvider>
      <FicusThemeProvider> 
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>


      <QueryClientProvider client={queryClient}>
           <BaseScreen />
      </QueryClientProvider>

      
    </ThemeProvider>
    
    </FicusThemeProvider>
      </PaperProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}