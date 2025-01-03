import { MMKV, Mode } from "react-native-mmkv";



export const storage = new MMKV({
    id: `user-details-storage`,
    mode: Mode.MULTI_PROCESS,
  })



  export const save_user_details = async (token: string, user_id: string) => {
     storage.set('user.token' , token)
     storage.set('user.id' , user_id)
  }


  export const getUserTokenFromStorage =  () => {
    return  storage.getString('user.token')
  }