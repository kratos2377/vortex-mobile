import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type HomeParamList = {
  main_screen: undefined;
  gamebet_screen: undefined;
  profile_screen: undefined;
  qr_scanner: undefined;
  bet_screen: undefined;
  change_password: undefined;
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: NativeStackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};