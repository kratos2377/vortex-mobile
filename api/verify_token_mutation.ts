
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_SEND_EMAIL_ROUTE, USER_VERIFY_TOKEN_ROUTE, USER_VERIFY_USER_ROUTE } from "./constants";
import axios from "axios";

export interface VerifyTokenCredentials {
    token: String
  }


export interface VerifyTokenMutationResponse {
result: {
    success: boolean
}
user_data: {
    id: string;
    email: string;
    name: string;
    score: number;
    verified: boolean;
    username: string;
    first_name: string;
    last_name: string
}
}
  
  
export const handleVerifyTokenMutation = async (credentials: VerifyTokenCredentials) => {

    try {
        
        const response = await axios.post(
            MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_VERIFY_TOKEN_ROUTE, credentials
        )

            if (response.status === 200 || response.status === 201) {
        
                    const recv_data = response.data as VerifyTokenMutationResponse
                    return recv_data
                } else {
                        return {result: {success: false} , error_message: response.data.error_message}
                }
    } catch(err) {
        return {result: {success: false} , error_message: "Some Error Occured"}
    }


}