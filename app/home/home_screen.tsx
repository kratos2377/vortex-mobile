import { StyleSheet, Platform } from 'react-native';

import React, { createRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavProps } from '../utils/HomeParamList';
import { Box, Select, Text , Option, useDisclosure, Button, Icon, Modal, ScrollBox, VStack, HStack, Image, Divider, Spinner, Stack, Flex } from 'react-native-ficus-ui';
import TokenList from '../../components/TokenList';
import { useQuery } from '@tanstack/react-query';
import { COINAPI_BASE_URL } from '../../api/constants';
import { CandlestickChart } from 'react-native-wagmi-charts';

export default function HomeScreen({ navigation, route }: HomeNavProps<'home_screen'>) {

  const [selectValue, setSelectedValue] = useState("5m");
  const selectRef = createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: tokenModalisOpen, onOpen: tokenModalonOpen, onClose: tokenModalonClose } = useDisclosure();
  const [token1 , setToken1] = useState("SOL")
  const [token2 , setToken2] = useState("BTC")
  const [token1Image , setToken1Image] = useState("SOL")
  const [token2Image , setToken2Image] = useState("BTC")
  const [token_number , setTokenNumber] = useState<1 | 2>(1)
  const [candleChartData , setCandleChartData] = useState([])


  const getPeriodID = (val: string) => {
    switch (val) {
      case "5m":
        return "10SEC"
      
      case "15m":
          return "20SEC"

      case "1h":
        return "2MIN"
      
      case "6h":
        return "10MIN"
      
      case "12h":
        return "15MIN"
      
      case "1D":
        return "30MIN"

      default:
        return "5MIN"
    }
  }


  const getStartTimeFromSelectedValue = (time_end: Date , value: string) => {

    switch (value) {
      case "5m":
        return new Date(time_end.getTime() - (5 * 60 * 1000))
      
      case "15m":
          return new Date(time_end.getTime() - (15 * 60 * 1000))

      case "1h":
        return new Date(time_end.getTime() - (60 * 60 * 1000))
      
      case "6h":
        return new Date(time_end.getTime() - (360 * 60 * 1000))
      
      case "12h":
        return new Date(time_end.getTime() - (720 * 60 * 1000))
      
      case "1D":
        return new Date(time_end.getTime() - (1440 * 60 * 1000))

      default:
        return new Date(time_end.getTime() - (5 * 60 * 1000))
    }

  }

  

  const {data , isLoading , error , refetch} = useQuery({
    queryKey: ['crypto_data'],
    queryFn: async () => {
      let time_end = new Date()
      let time_start = getStartTimeFromSelectedValue(time_end , selectValue).toISOString();
      let uri = COINAPI_BASE_URL + "/" + token1 + "/" + token2 + "/history?time_end=" + time_end.toISOString() + "&time_start=" + time_start   + "&period_id=" + getPeriodID(selectValue) 

      console.log("URI IS")
      console.log(uri)

      const response = await fetch(uri, {
        headers: {
          "Accept": "application/json",
          "X-CoinAPI-Key": "A9E2EC76-5E1C-401D-8AB3-8EA49E5C7C9A"
        }
      })



        if(response.status === 200) {
          // console.log("MARKET DATA IS")
          // console.log(await response.json())
          let mk_data = await response.json();
          makeCandleChartData(mk_data)

        }  else {
            console.log("some error occured")
        }
     },
     enabled: false
  })

  const makeCandleChartData = (chart_data) => {


    let complete_new_data = Object.entries(chart_data).map(([ind , ele]) => {

      let  timestampMs =  new Date(ele!.time_period_start).getTime()

      return {
        timestamp: timestampMs,
        open: ele.rate_open,
        high: ele.rate_high,
        low: ele.rate_low,
        close: ele.rate_close,
      }
    })

    console.log("THE COMPLETE DATA IS")
    console.log(complete_new_data)

    setCandleChartData([...complete_new_data])

  }

  useEffect(() => {
 //  makeCandleChartData(ohlcv_data)
    refetch()
  } , [selectValue , token1 , token2])

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

        {
          isLoading ?   <Box h="100vh" w="100vh" alignItems="center" >
            <Spinner color="blue.500" size="lg" />
          </Box> :
                <CandlestickChart.Provider data={candleChartData} >
            <CandlestickChart>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair >
              <CandlestickChart.Tooltip />
                </CandlestickChart.Crosshair>
            </CandlestickChart>
            <HStack>
            <Box flexDirection="column" alignItems="center">
            <Flex flexDirection="row">
              <Box>
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText type="open" precision={9} variant="value"/>
              </Box>
              <Box>
                <Text fontSize="100">High</Text>
                
        <CandlestickChart.PriceText type="high" precision={9} variant="value"/>
              </Box>
              </Flex >
              <Flex flexDirection="row" mt={5}>
              <Box>
                <Text fontSize="100">Low</Text>
                <CandlestickChart.PriceText type="low" precision={9} variant="value" />
              </Box>
              <Box>
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText type="close" precision={9} variant="value"/>
              </Box>
            </Flex>
          </Box>
            </HStack>
            <Box mt={5}>
              
        <CandlestickChart.DatetimeText />
            </Box>
          </CandlestickChart.Provider>
         
        }


        <Select
        onSelect={setSelectedValue}
        ref={selectRef}
        value={selectValue}
        title="Choose Time"
        mt="md"
        pb="2xl"
        message=""
        data={["5m", "15m", "1h", "4h"]}
        renderItem={(item, index) => (
          <Option value={item} py="md" px="xl">
            <Text>{item}</Text>
          </Option>
        )}
      />


        <Modal isOpen={isOpen}  h="50%">
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
              setToken1Image={setToken1Image}
              setToken2Image={setToken2Image}
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
