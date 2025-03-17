
import AsyncStorage from '@react-native-async-storage/async-storage';




  export const save_user_details = async (token: string, user_id: string) => {
    await AsyncStorage.setItem('user.token' , token)
    await AsyncStorage.setItem('user.id' , user_id)
  }


  export const  getUserTokenFromStorage =  async () => {
    return  await AsyncStorage.getItem('user.token')
  }

  export const deleteDetailsFromStorage =  async () => {
    await  AsyncStorage.removeItem('user.token')
     await AsyncStorage.removeItem('user.id')
  }