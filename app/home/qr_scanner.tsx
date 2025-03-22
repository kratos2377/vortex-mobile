import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler, SafeAreaView, Vibration, Linking, Button} from 'react-native';
import { CameraScanner } from "@/components/CameraScanner";
import {StyleSheet} from 'react-native';
import { getShadowProps, goToSettings } from '@/helpers';
import { EPermissionTypes, usePermissions } from '@/hooks/usePermissions';
import { HomeNavProps } from '@/utils/HomeParamList';
import { Camera, CameraType } from 'expo-camera';
import { useAuthorization } from '@/utils/useAuthorization';
import { ActivityIndicator, Card, Modal, PaperProvider, Portal } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from "expo-image-picker";
import { handleCheckStatusMutation } from '@/api/check_stake_status_mutation';
import { useUserStore } from '@/store/user_state';

export default function QRScannerScreen({ navigation, route }: HomeNavProps<'qr_scanner'>) {
  const {user_details} = useUserStore()
  const [type, setType] = useState(CameraType.back);
  const [displayText, setDisplayText]= useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const {selectedAccount} = useAuthorization()
  const [showModal , setShowModal] = useState(false)
  const [errorModal , setErrorModal] = useState(false)
  const [checkingStatus , setCheckingStatus] = useState(false)

  const hideModal = () =>  {

    setErrorModal(false)
    setCheckingStatus(false)
    
    setShowModal(false)

  };
  const hideErrorModal = () => {
    setErrorModal(false)
    setCheckingStatus(false)
    
    setShowModal(false)
  }
  const containerStyle = {backgroundColor: 'white'};


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
 
 
 // pick an image from gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
 
 
    // if the user successfully picks an image then we check if the image has a QR code
    if (result && result.assets[0].uri) {
      try {
        console.log("QR SCANNED RESULT IS")
        console.log(result)
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );


 
        setCheckingStatus(true)
        console.log(scannedResults)
        const dataNeeded = scannedResults[0].data;


        let parsed_data =  JSON.parse(dataNeeded)


        if (selectedAccount === undefined || selectedAccount === null) {
          setShowModal(true)
        } else {


          Vibration.vibrate();

      let check_status_response  = await handleCheckStatusMutation({
        user_who_is_betting: user_details.id,
        user_betting_on: parsed_data.user_who_is_betting,
        game_id: parsed_data.game_id,
        bet_type: parsed_data.bet_type
      })


      if(check_status_response.result.success) {

      setCheckingStatus(false)
        navigation.push("bet_screen", {
          game_id: parsed_data.game_id,
          user_betting_on: parsed_data.user_betting_on,
          user_who_is_betting: user_details.id,
          is_player: parsed_data.is_player,
          is_replay: parsed_data.is_replay,
          bet_type: parsed_data.bet_type,
          session_id: check_status_response.session_id,
          event_type: parsed_data.is_player ? null : check_status_response.type,
          is_match: parsed_data.is_match,
        })
      } else {

        setCheckingStatus(false)
        setErrorModal(true)


      }


        }

        
      } catch (error) {
 // if there this no QR code
 console.log("ERROR FROM CATCH BLOCK")
 console.log(error)
        setDisplayText("No QR Code Found");
        setTimeout(() => setDisplayText(""), 4000);

        setCheckingStatus(false)
        setErrorModal(true)
      }
    }
  };

  const handleBarCodeScanned = async ({ data }: {data: string}) => {
    try {
    if (selectedAccount === undefined || selectedAccount === null) {
      setShowModal(true)
    } else {

      Vibration.vibrate();

      setCheckingStatus(true)

      console.log("data from qr scanner is: ", data);


      let parsed_data = JSON.parse(data)

      let check_status_response  = await handleCheckStatusMutation({
        user_who_is_betting: user_details.id,
        user_betting_on: parsed_data.user_who_is_betting,
        game_id: parsed_data.game_id,
        bet_type: parsed_data.bet_type
      })


      if(check_status_response.result.success) {

      setCheckingStatus(false)
      navigation.push("bet_screen", {
        game_id: parsed_data.game_id,
        user_betting_on: parsed_data.user_betting_on,
        user_who_is_betting: user_details.id,
        is_player: parsed_data.is_player,
        is_replay: parsed_data.is_replay,
        bet_type: parsed_data.bet_type,
        session_id: check_status_response.session_id,
        event_type: parsed_data.is_player ? null : check_status_response.type,
        is_match: parsed_data.is_match,
      })
      } else {


      setCheckingStatus(false)

        setErrorModal(true)


      }
    }
   
    }

    catch(err) {
      setCheckingStatus(false)
      setErrorModal(true)
    }


  };

  const goToSettings = () => {
    Linking.openSettings();
  };


  if (hasCameraPermission) {
    return (
      <Portal>
  
  <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{padding: 5 , margin: 5}}>
       
      <View style={{padding: 5}}>
      <Text>No Account Selected.</Text>  
      <Text>You have to select a valid account in HomeScreen First. Only then you can bet</Text>
      </View>

        </Modal>

        <Modal visible={errorModal} onDismiss={hideErrorModal} contentContainerStyle={containerStyle} style={{padding: 5 , margin: 5}}>

      <View style={{padding: 5}}>
      <Text>Error while placing bet</Text>  
      <Text>Either the game is invalid or stake time is over.</Text>
      <Text>Also check whether QR Data is valid or not</Text>
      </View>

        </Modal>

        {
        !showModal && !errorModal ?  
        <View style={styles.cameraQRContainer}>


          {
            checkingStatus ?    <Card style={{flex: 1 , justifyContent: "center", margin: 3 , padding: 5}}>
            <Card.Title title="Checking Game Stake Status"/>
            <Card.Content>
            <ActivityIndicator animating={true}/>
            </Card.Content>
          </Card>  :     <Camera
            style={{ flex: 1 }}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
    
           onBarCodeScanned={handleBarCodeScanned}
          />
          }

      <View style={styles.boxContainer}>
        <View style={{marginBottom:50}}>
        
          <Button title='Pick from gallery' onPress={pickImage}/>
        </View>
      </View>

      <View
        style={styles.scanBoxContainer}
      >
        <View style={styles.scanBox}></View>
      </View>
 </View> : <></>
  }
 
 </Portal>
    );
  }


  return (
    <SafeAreaView>
      <View style={{flex: 1, flexDirection: "column" , alignContent: "center"}}>
        <Text>Enable Camera Permissions to scan QR codes</Text>
        <Button onPress={goToSettings} title='Open Settings'/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  itemContainer: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    marginTop: 30,
    justifyContent: 'center',
    ...getShadowProps(),
    paddingLeft: 20,
  },
  itemText: {
    fontSize: 17,
    color: 'black',
  },
  cameracontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  cameraQRContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxContainer:{
    position:'absolute',
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    height:'100%',
    width:'100%',
    zIndex:1
  },
  scanBoxContainer:{
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%',
    zIndex:0,
  },
  scanBox: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "white",
  }
});