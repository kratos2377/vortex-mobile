

export enum EPermissionTypes {
    CAMERA = 'camera',
  }


export type TUsePermissionsReturnType = {
  isError?: boolean;
  errorMessage?: string;
};

export interface ICameraScannerProps {
  setIsCameraShown: (value: boolean) => void;
  onReadCode: (value: string) => void;
}