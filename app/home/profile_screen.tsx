import { StyleSheet, Image, Platform, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import  React , {useEffect, useState} from "react"
import { useUserStore } from '../../store/user_state';
import { HomeNavProps } from '@/utils/HomeParamList';
import { Avatar, Button, Divider, Switch } from 'react-native-paper';
import {Text} from "react-native-paper"

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


    <SafeAreaView style={{ height: imageDim,  width: "100%", alignItems: "center", padding: 5,  margin: 10}}>
    <Avatar.Image
      source={{uri: `https://robohash.org/necromorph23`}}
      size={imageDim}
    />
      
    </SafeAreaView>

    <Divider style={{marginTop: 10}}/>

    <Button style={{margin: 5}} >
      Profile
    </Button>

    <Divider/>

    <Button style={{margin: 5}} >
      Change Password
    </Button>

    <Divider/>

    <Button style={{margin: 5}} >
      Add/Remove Wallet
    </Button>


    <Divider/>

    <SafeAreaView  style={{margin: 5, flexDirection: "row", alignSelf: "center"}} > 
    <Text  style={{fontSize: 15, fontWeight: "bold",  marginRight: 5}}>
        Change Theme
    </Text>

    <Switch style={{marginLeft: 5}} value={on} onValueChange={() => toggle(!on)}  />
      </SafeAreaView>


    <Divider/>


    <Button  style={{margin: 5}}>
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
