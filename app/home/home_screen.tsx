import { StyleSheet, Platform } from 'react-native';

import React, { createRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavProps } from '../utils/HomeParamList';
import { Box, Select, Text , Option, useDisclosure, Button, Icon, Modal, ScrollBox, VStack, HStack, Image, Divider } from 'react-native-ficus-ui';
import TokenList from '@/components/TokenList';


export default function HomeScreen({ navigation, route }: HomeNavProps<'home_screen'>) {

  const [selectValue, setSelectedValue] = useState("5m");
  const selectRef = createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: tokenModalisOpen, onOpen: tokenModalonOpen, onClose: tokenModalonClose } = useDisclosure();
  const [token1 , setToken1] = useState("SOL")
  const [token2 , setToken2] = useState("BTC")
  const [token_number , setTokenNumber] = useState<1 | 2>(1)


  // console.log("DATA IS")
  // console.log(data)

  return (
    <SafeAreaView>

        <Box maxH="100vh" maxW="100%" flexDirection="row" justifyContent="space-between">

         <Button onPress={() => {
          onOpen()
         }}
         
         top={10}
         left={10}
         >
                <Text>{token1}/{token2}</Text>
         </Button>


         <Button
       maxH="100vh" maxW="100%"
        colorScheme="blue"
        onPress={() => {
          if (selectRef.current) {
            selectRef.current.open();
          }
        }}

        top={10}
        right={10}
      >
        {selectValue ? selectValue.toString() : 'Select Time'}
      </Button>
          
        </Box>


        <Select
        onSelect={setSelectedValue}
        ref={selectRef}
        value={selectValue}
        title="Choose Time"
        mt="md"
        pb="2xl"
        message=""
        data={["5m", "15m", "1hr", "4h"]}
        renderItem={(item, index) => (
          <Option value={item} py="md" px="xl">
            <Text>{item}</Text>
          </Option>
        )}
      />


        <Modal isOpen={isOpen} style={{height: "50%" , width: "60%" , alignSelf: "center"}}>
        <Button
            h={20}
            w={20}
            position="relative"
                 alignSelf="flex-end"
          top={10}
          right={10}
          borderRadius="full"
          colorScheme="gray"
          onPress={() => {
            onClose();
          }}
        >
          <Icon color="white" name="close" />
        </Button>
          
          <Box flexDirection="column" justifyContent="center"  h="100%">
          <Text ml={10} mb={10}>
            Choose Base Token:
          </Text>
            <Button colorScheme="teal" variant="ghost" full px={20} onPress={() => {
              setTokenNumber(1)
              tokenModalonOpen()
            }}>
          {token1}
        </Button>


        <Text ml={10} mb={10}>
            Choose Quote Token:
          </Text>

        <Button colorScheme="teal" variant="ghost" full px={20} onPress={() => {
            setTokenNumber(2)
              tokenModalonOpen()
            }}>
          {token2}
        </Button>
          </Box>
      </Modal>


            <TokenList tokenModalisOpen={tokenModalisOpen} tokenModalonClose={tokenModalonClose} tokenModalonOpen={tokenModalonOpen}
            token_number={token_number}
            setToken1={setToken1}
              setToken2={setToken2}
            />



        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
