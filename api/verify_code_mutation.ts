import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_SEND_EMAIL_ROUTE, USER_VERIFY_USER_ROUTE } from "./constants";
import axios from "axios";

export interface VerifyCodeMutationCredentials {
    user_key: string;
    id: string;
  }


export interface VerifyCodeMutationResponse {
result: {
    success: boolean
}
}
  
  
export const handleVerifyCodeMutation = async (credentials: VerifyCodeMutationCredentials) => {

    try {
        const response = await axios.post(
            MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_VERIFY_USER_ROUTE, credentials
        )


    if (response.status === 200 || response.status === 201) {

            const recv_data = response.data as VerifyCodeMutationResponse
            return recv_data
        } else {
                return {result: {success: false} , error_message: response.data.error_message}
        }

    } catch(err) {
        return {result: {success: false} , error_message: "Some Error Occured"}
    }


}