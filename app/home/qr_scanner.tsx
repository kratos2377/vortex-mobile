import { View, Text, StyleSheet, SafeAreaView, Pressable, Platform, StatusBar, AppState } from "react-native";
import  React, {useRef , useEffect} from "react"
import { CameraView, useCameraPermissions } from "expo-camera";
import { HomeNavProps } from '../utils/HomeParamList';
import { Overlay } from "../../components/Overlay";

export default function QRScannerScreen({ navigation, route }: HomeNavProps<'qr_scanner'>) {

  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
             // await Linking.openURL(data);
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
});