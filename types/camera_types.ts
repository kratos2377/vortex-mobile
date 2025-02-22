
import {RESULTS} from 'react-native-permissions';

export enum EPermissionTypes {
    CAMERA = 'camera',
  }


export type TUsePermissionsReturnType = {
  isError?: boolean;
  type: (typeof RESULTS)[keyof typeof RESULTS];
  errorMessage?: string;
};

export interface ICameraScannerProps {
  setIsCameraShown: (value: boolean) => void;
  onReadCode: (value: string) => void;
}