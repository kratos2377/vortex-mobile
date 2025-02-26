import { useState, useEffect } from "react";
import { Dimensions, Alert, Vibration, View , StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Linking from "expo-linking";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Text} from "react-native-paper"


export const CameraScanner = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setCameraPermission] = useState<boolean | null>(
    true
  );

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      setCameraPermission(cameraPermission.status === "granted");
  
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    if (hasCameraPermission !== null ) {
      // Check permissions and execute logic when both permissions are set
      if (!hasCameraPermission) {
        Alert.alert(
          "Camera Permissions Required",
          "You must grant access to your camera to scan QR codes",
          [
            { text: "Go to settings", onPress: goToSettings },
            {
              text: "Cancel",
              onPress: () => {
               // router.dismissAll();
              },
              style: "cancel",
            },
          ]
        );
      }
    }
  }, [hasCameraPermission]);

  const handleBarCodeScanned = async ({ data }) => {
    Vibration.vibrate();
    console.log("data", data);
  };

  const goToSettings = () => {
    Linking.openSettings();
  };

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  if (hasCameraPermission) {
    return (
      <View style={styles.container}>
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