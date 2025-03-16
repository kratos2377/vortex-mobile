import { StyleSheet, Image, Platform, ScrollView, Dimensions, SafeAreaView, View } from 'react-native';
import  React , {useEffect, useState} from "react"
import { useUserStore } from '../../store/user_state';
import { HomeNavProps } from '@/utils/HomeParamList';
import { ActivityIndicator, Avatar, Button, Divider, Modal, Portal, Switch } from 'react-native-paper';
import {Text} from "react-native-paper"
import { deleteDetailsFromStorage } from '@/store/store';

export default function ProfileScreen({ navigation, route }: HomeNavProps<'profile_screen'>) {
  const { fn } = route.params
  const {user_details , resetUserModelState} = useUserStore()

  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [imageDim , setImageDim] = useState(0)
const [on, toggle] = useState(false);


//Logout Modal States
const [showAskModal , setShowAskModal] = useState(false)
const [logoutLoadModal , setLogoutLoadModal] = useState(false)

useEffect(() => {
    setImageDim(Math.min(windowHeight/3 , windowWidth/2))
} , [])


const handleLogout = async () => {
  setShowAskModal(false)
  setLogoutLoadModal(true)

  await deleteDetailsFromStorage()
  await resetUserModelState()

  setTimeout(() => {
    setLogoutLoadModal(false)
    fn()
  }, 1000)
}

  return (
    <ScrollView>


    <SafeAreaView style={{ height: imageDim,  width: "100%", alignItems: "center", padding: 5,  margin: 10}}>
    <Avatar.Image
      source={{uri: `https://robohash.org/necromorph23`}}
      size={imageDim}
    />
      
    </SafeAreaView>

    <Divider style={{marginTop: 10}}/>

    {/* <Button style={{margin: 5}} >
      Profile
    </Button> */}

    <Divider/>

    <Button style={{margin: 5}} >
      Change Password
    </Button>

    <Divider/>



    <Divider/>

    {/* <SafeAreaView  style={{margin: 5, flexDirection: "row", alignSelf: "center"}} > 
    <Text  style={{fontSize: 15, fontWeight: "bold",  marginRight: 5}}>
        Change Theme
    </Text>

    <Switch style={{marginLeft: 5}} value={on} onValueChange={() => toggle(!on)}  />
      </SafeAreaView>


    <Divider/> */}


    <Button  style={{margin: 5}} >
     Logout 
    </Button>

    <Portal>
        <Modal visible={showAskModal} onDismiss={() => {
          setShowAskModal(false)
        }} contentContainerStyle={{margin: 2}}>
          <Text>Are you sure you want to Logout ?</Text>

          <View style={{flex: 1, flexDirection: "row" , justifyContent: "flex-end" }}>

          <Button onPress={() => {
          setShowAskModal(false)
        }} style={{marginRight: 1}}>
            No
          </Button>


          <Button style={{marginRight: 2}} onPress={handleLogout}>
            Yes
          </Button>

          </View>
        </Modal>
      </Portal>


       <Portal>
        <Modal visible={logoutLoadModal} onDismiss={() => {}} contentContainerStyle={{margin: 2}}>
          <View style={{flex: 1 , flexDirection: "row" }}>


          <Text style={{marginRight: 3}}>
          Logging out...
          </Text>

          <ActivityIndicator animating={true}/>
          </View>
        </Modal>
      </Portal>

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
