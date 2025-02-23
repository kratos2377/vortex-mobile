import { useState, useEffect } from "react";
import { Dimensions, Alert, Vibration } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import React from "react";



export const CameraScanner = () => {
  const [hasCameraPermission, setCameraPermission] = useState<boolean | null>(
    null
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
                router.dismissAll();
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

  if (hasCameraPermission) {
    return (
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={{ height: Dimensions.get("window").height }}
      />
    );
  }
}