import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler, SafeAreaView, Vibration, Linking} from 'react-native';
import { CameraScanner } from "@/components/CameraScanner";
import {StyleSheet} from 'react-native';
import { getShadowProps, goToSettings } from '@/helpers';
import { EPermissionTypes, usePermissions } from '@/hooks/usePermissions';
import { HomeNavProps } from '@/utils/HomeParamList';
import { Camera, CameraType } from 'expo-camera';
import { useAuthorization } from '@/utils/useAuthorization';
import { Modal, PaperProvider } from 'react-native-paper';

export default function QRScannerScreen({ navigation, route }: HomeNavProps<'qr_scanner'>) {
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setCameraPermission] = Camera.useCameraPermissions();
  const {selectedAccount} = useAuthorization()
  const [showModal , setShowModal] = useState(false)

  const hideModal = () => setShowModal(false);
  const containerStyle = {backgroundColor: 'white'};

  useEffect(() => {
    if (hasCameraPermission !== null ) {
      // Check permissions and execute logic when both permissions are set
      if (!hasCameraPermission.granted) {
        Alert.alert(
          "Camera Permissions Required",
          "You must grant access to your camera to scan QR codes",
          [
            { text: "Go to settings", onPress: goToSettings },
            {
              text: "Cancel",
              onPress: () => {
                navigation.replace("gamebet_screen")
              },
              style: "cancel",
            },
          ]
        );
      } else {
        console.log("CAMERA has camera PERMISSION")
        console.log(hasCameraPermission)
      }
    }
  }, [hasCameraPermission]);

  const handleBarCodeScanned = async ({ data }: {data: string}) => {
    Vibration.vibrate();
    if (selectedAccount === undefined || selectedAccount === null) {
      setShowModal(true)
    } else {
      console.log("data", data);

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

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  if (hasCameraPermission?.granted) {
    return (
      <PaperProvider>
        <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>No Account Selected.</Text>  
        <Text>You have to select a valid account in HomeScreen First. Only then you can bet</Text>
        </Modal>

             <View style={styles.cameracontainer}>
      <Camera style={styles.camera} type={type} onBarCodeScanned={handleBarCodeScanned}/>
    </View>
      </PaperProvider>
    );
  }


  return (
    <SafeAreaView>
      <View>
        <Text>Enable Camera Permissions to scan QR codes</Text>
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
});