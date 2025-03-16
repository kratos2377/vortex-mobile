import axios from 'axios'
import { CHANGE_USER_PASSWORD_ROUTE, CHECK_STAKE_STATUS_ROUTE, GAME_ROUTE, MESSIER_BASE_URL, USER_LOGIC_ROUTE, USER_LOGIN_ROUTE, VORTEX_PUB_SUB_URL } from "./constants";

  
export interface ChangePasswordPayload {
    user_id: String,
    password: String,
    new_password: String,
  }


export interface ChangePasswordResponse {
result: {
    success: boolean
}
error_message: string |  undefined | null
}


export const handleChangePassword = async (details: ChangePasswordPayload) => {

    try {
        
        const response = await axios.post(
            MESSIER_BASE_URL + USER_LOGIC_ROUTE + CHANGE_USER_PASSWORD_ROUTE, details
        )

        const recv_data = response.data as ChangePasswordResponse

        if(response.status === 200 || response.status === 201) {
            return recv_data
        } else {
            return {result: {success: false} , error_message: recv_data.error_message}
        }

    } catch(err) {
        return {result: {success: false} , error_message: "Some Error Occured"}
    }

}