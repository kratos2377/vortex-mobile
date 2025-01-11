import { StyleSheet, Image, Platform, ScrollView, Dimensions } from 'react-native';
import  React , {useEffect, useState} from "react"
import { HomeNavProps } from '../utils/HomeParamList';
import { Avatar, VStack, Box, Divider, Button, Text, Switch } from 'react-native-ficus-ui';
import { useUserStore } from '@/store/user_state';

export default function ProfileScreen({ navigation, route }: HomeNavProps<'profile_screen'>) {

  const {user_details} = useUserStore()

  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [imageDim , setImageDim] = useState(0)
const [on, toggle] = useState(false);

useEffect(() => {
    setImageDim(Math.min(windowHeight/3 , windowWidth/2))
} , [])


  return (
    <ScrollView>

      <VStack spacing={20}/>

    <Box h={imageDim} w="100%" alignItems="center" p={5}  m={10}>
    <Avatar
      name={`necromorph23`}
      src={`https://robohash.org/necromorph23`}
      h={imageDim}
      w={imageDim}
    />
      
    </Box>

    <Divider mt={10}/>

    <Button colorScheme="teal" variant="ghost" full m={5}>
      Profile
    </Button>

    <Divider/>

    <Button colorScheme="teal" variant="ghost" full m={5}>
      Change Password
    </Button>

    <Divider/>

    <Button colorScheme="teal" variant="ghost" full m={5}>
      Add/Remove Wallet
    </Button>


    <Divider/>

    <Box  m={5} flexDirection="row" alignSelf="center" > 
    <Text color="teal" fontSize={15} fontWeight="bold" mr={5}>
        Change Theme
    </Text>

    <Switch ml={5} on={on} onPress={() => toggle(!on)}  />
      </Box>


    <Divider/>


    <Button colorScheme="teal" variant="ghost" full m={5}>
     Logout 
    </Button>
   
    </ScrollView>
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
