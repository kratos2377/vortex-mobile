import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler, SafeAreaView, Vibration, Linking, Button} from 'react-native';
import { CameraScanner } from "@/components/CameraScanner";
import {StyleSheet} from 'react-native';
import { getShadowProps, goToSettings } from '@/helpers';
import { EPermissionTypes, usePermissions } from '@/hooks/usePermissions';
import { HomeNavProps } from '@/utils/HomeParamList';
import { Camera, CameraType } from 'expo-camera';
import { useAuthorization } from '@/utils/useAuthorization';
import { Modal, PaperProvider } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from "expo-image-picker";

export default function QRScannerScreen({ navigation, route }: HomeNavProps<'qr_scanner'>) {
  const [type, setType] = useState(CameraType.back);
  const [displayText, setDisplayText]= useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const {selectedAccount} = useAuthorization()
  const [showModal , setShowModal] = useState(false)

  const hideModal = () => setShowModal(false);
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
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );
 
        
        const dataNeeded = scannedResults[0].data;

        Vibration.vibrate();
        console.log("Scanned image data is")
        console.log(dataNeeded)
        setDisplayText(dataNeeded)
      } catch (error) {
 // if there this no QR code
        setDisplayText("No QR Code Found");
        setTimeout(() => setDisplayText(""), 4000);
      }
    }
  };

  const handleBarCodeScanned = async ({ data }: {data: string}) => {
    if (selectedAccount === undefined || selectedAccount === null) {
      setShowModal(true)
    } else {

      Vibration.vibrate();
      console.log("data from qr scanner is: ", data);

      navigation.push("bet_screen", {
        game_id: data.game_id,
        user_betting_on: data.user_betting_on,
        user_who_is_betting: data.user_who_is_betting,
        is_player: data.is_player,
        is_replay: data.is_replay,
        bet_type: data.bet_type,
        session_id: data.session_id,
        is_match: data.is_match,
      })
    }

  };

  const goToSettings = () => {
    Linking.openSettings();
  };


  if (hasCameraPermission) {
    return (
      <PaperProvider>
        <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>No Account Selected.</Text>  
        <Text>You have to select a valid account in HomeScreen First. Only then you can bet</Text>
        </Modal>

        <View style={styles.cameraQRContainer}>
     <Camera
         style={{ flex: 1 }}
         barCodeScannerSettings={{
           barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
         }}

        onBarCodeScanned={handleBarCodeScanned}
       />

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
 </View>
      </PaperProvider>
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