import { StyleSheet, Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import  React , {useEffect, useState} from "react"
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HomeNavProps } from '../utils/HomeParamList';
import { useUserStore } from '@/store/user_state';
import { StatusBar } from 'expo-status-bar';
import { Box, Button, Icon, IconButton, ScrollBox, Text, VStack } from 'react-native-ficus-ui';
import useAuthorization from '../utils/useAuthorization';
import AccountInfo from '@/components/AccountInfo';
import SignInButton from '@/components/SignInButton';

export default function GameBetScreen({ navigation, route }: HomeNavProps<'gamebet_screen'>) {

    const {user_details} = useUserStore()
    const [walletCount , setWalletCount] = useState(0)
    const {accounts, onChangeAccount, selectedAccount} = useAuthorization();
    useEffect(() => {

      

    } , [])

  return (
   <Box w="100%" h="100%">

      <Box w="100%" flexDirection="row" justifyContent="space-between" p={5} mb={10}>

        <Button 
            suffix={
              <Icon name="down" color="white" fontSize="xl" ml="sm" />
            }
        >
          Address 
        </Button>

        <Box  alignSelf="flex-end" flexDirection="row" alignItems="center">

          <Text fontSize={15}>Total sols: 34.32</Text>


          <IconButton
      icon={<Icon name="search1" />}
      colorScheme="red"
      variant="ghost"
      full
    />
        </Box>
        
      </Box>


      

            <ScrollBox>
            <VStack spacing="md">
            {accounts && selectedAccount ? (
          <AccountInfo
            accounts={accounts}
            onChange={onChangeAccount}
            selectedAccount={selectedAccount}
          />
        ) : (
          <View style={styles.container}>
            <SignInButton mode="contained">
              Sign In
            </SignInButton>
          </View>
        )}
            </VStack>
            </ScrollBox>
        

   </Box>
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