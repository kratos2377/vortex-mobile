import { StyleSheet, View } from 'react-native'
import React from 'react'
import data from "../data/crypto_coin.json"

interface TokenListProps {
    tokenModalisOpen: boolean,
    tokenModalonOpen: () => void,
    tokenModalonClose: () => void,
    token_number: 1 | 2,
    setToken1: React.Dispatch<React.SetStateAction<string>>,
    setToken2: React.Dispatch<React.SetStateAction<string>>,
    setToken1Image: React.Dispatch<React.SetStateAction<string>>,
    setToken2Image: React.Dispatch<React.SetStateAction<string>>,
}

const TokenList = ({ tokenModalisOpen , tokenModalonOpen , tokenModalonClose , token_number , setToken1 , setToken2 , setToken1Image , setToken2Image } : TokenListProps) => {
  return (
    <Modal isOpen={tokenModalisOpen} style={{height: "100%" , width: "100%" , alignSelf: "center"}}>
    <Button
      h={20}
      w={20}
      position="relative"
      top={10}
      right={10}
      alignSelf="flex-end"
      borderRadius="full"
      colorScheme="gray"
      onPress={() => {
        tokenModalonClose();
      }}
    >
      <Icon color="white" name="close" />
    </Button>
      
     <Box maxH="100vh" maxW="100vh" p={5} top={10} left={10} mb={10}>
     <Text fontSize={20}> Choose from a list of tokens</Text>
     </Box>


     <ScrollBox h="80%">

        <VStack spacing="md">
              {
                Object.entries(data).map(([name , data]) => {

                  return   (
                      <Box key={data.asset_symbol}>
                        <Divider my="md"/>
                              <Button
                        colorScheme="green"
                      key={data.asset_symbol}
                        variant="ghost"
                        mx={10}
                        my={3}
                        full
                        suffix ={
                          <Image
                          h={30}
                          w={30}
                          mx={5}
                          borderRadius={15}
                          source={{
                            uri: data.asset_symbol_pic_url ,
                          }}
                        />
                        }

                        onPress={() => {


                         if(token_number === 1) {
                            setToken1(data.asset_symbol)
                            setToken1Image(data.asset_symbol_pic_url)
                            tokenModalonClose()
                         } else {
                            setToken2(data.asset_symbol)
                            
                            setToken2Image(data.asset_symbol_pic_url)
                            tokenModalonClose()
                         }
                        }}
                      >
                      {name}
                      </Button>
                      <Divider my="md"/>
                      </Box>
                  )
                })
              }
        </VStack>

     </ScrollBox>
  </Modal>
  )
}

export default TokenList

const styles = StyleSheet.create({})