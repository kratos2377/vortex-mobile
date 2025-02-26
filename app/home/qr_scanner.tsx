import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler, SafeAreaView, Vibration, Linking} from 'react-native';
import { CameraScanner } from "@/components/CameraScanner";
import {StyleSheet} from 'react-native';
import { getShadowProps, goToSettings } from '@/helpers';
import { EPermissionTypes, usePermissions } from '@/hooks/usePermissions';
import { HomeNavProps } from '@/utils/HomeParamList';
import { Camera, CameraType } from 'expo-camera';

export default function QRScannerScreen({ navigation, route }: HomeNavProps<'qr_scanner'>) {
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setCameraPermission] = Camera.useCameraPermissions();

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const cameraPermission = await Camera.requestCameraPermissionsAsync();

  //     setCameraPermission(cameraPermission.status === "granted");
  //     console.log("CAMERA PERMISSION")
  //     console.log(hasCameraPermission)
  //   };

  //   requestPermissions();
  // }, []);

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
    console.log("data", data);
  };

  const goToSettings = () => {
    Linking.openSettings();
  };

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  if (hasCameraPermission?.granted) {
    return (
      <View style={styles.cameracontainer}>
      <Camera style={styles.camera} type={type} onBarCodeScanned={handleBarCodeScanned}/>
    </View>
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