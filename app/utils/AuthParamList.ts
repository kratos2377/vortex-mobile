import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type AuthParamList = {
  index: undefined;
  registration: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: NativeStackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};