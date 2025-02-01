import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import * as React from "react"
import { HomeNavProps } from '../utils/HomeParamList';
import { Avatar, Button, Card , Text, TextInput} from 'react-native-paper';
import { Box, Button as FCButton, Icon, Image, useDisclosure } from 'react-native-ficus-ui';
import TokenList from '@/components/TokenList';


const RightContent = props => <Box mr={1}><Avatar.Icon {...props} icon="folder" /></Box>

export default function SwapScreen({ navigation, route }: HomeNavProps<'swap_screen'>) {


  const [baseTokenName , setBaseTokenName] = React.useState("SOL")
  const [baseTokenImageSrc , setBaseTokenImageSrc]  = React.useState("https://cryptologos.cc/logos/solana-sol-logo.png")

  const [quoteTokenName , setQuoteTokenName] = React.useState("BTC")
  const [quoteTokenImageSrc , setQuoteTokenImageSrc]  = React.useState("https://cryptologos.cc/logos/bitcoin-btc-logo.png")
  const [tokenNumber , setTokenNumber] = React.useState<1 | 2>(1)
  const { isOpen: tokenModalisOpen, onOpen: tokenModalonOpen, onClose: tokenModalonClose } = useDisclosure();


  return (
    <Box h="100%" w="100%" flex={1} flexDirection="column" justifyContent="center" mx={2}>
      <Card>
    <Card.Title title="Swap Tokens" subtitle="Choose tokens and amount you want to swap" right={RightContent} />
    <Card.Content>
      <Box my={5} >
     
      <Box flexDirection="row" alignItems="center" justifyContent="center">

      <FCButton mr={1}
        variant="outlined"
  

      prefix ={
        <Image
        h={15}
        w={15}
        mx={2}
        borderRadius={15}
        source={{
          uri: baseTokenImageSrc ,
        }}
      />
      }


      onPress={() => {
        setTokenNumber(1)
        tokenModalonOpen()
      }}

      >
            {baseTokenName}
      </FCButton>


      <TextInput
      mode="outlined"
      label="Base Token"
      placeholder=""
      keyboardType="numeric"
      

    />



      </Box>

      <Box flexDirection="row" alignItems="center" justifyContent="center">

      <FCButton mr={1}
      
  
        variant="outlined"

      prefix ={
        <Image
        h={15}
        w={15}
        mx={2}
        borderRadius={15}
        source={{
          uri: quoteTokenImageSrc ,
        }}
      />
      }


      onPress={() => {
        setTokenNumber(2)
        tokenModalonOpen()
      }}

      >
            {quoteTokenName}
      </FCButton>


      <TextInput
      mode="outlined"
      label="Quote Token"
      placeholder=""
      keyboardType="numeric"
      

    />



      </Box>

      </Box>
    </Card.Content>
    <Card.Actions>
      <Button>Swap</Button>
    </Card.Actions>
  </Card>

  <TokenList tokenModalisOpen={tokenModalisOpen} tokenModalonClose={tokenModalonClose} tokenModalonOpen={tokenModalonOpen}
            token_number={tokenNumber}
            setToken1={setBaseTokenName}
              setToken2={setQuoteTokenName}
              setToken1Image={setBaseTokenImageSrc}
              setToken2Image={setQuoteTokenImageSrc}
            />


    </Box>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
