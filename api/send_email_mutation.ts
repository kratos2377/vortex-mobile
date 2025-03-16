import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_SEND_EMAIL_ROUTE } from "./constants";
import axios from "axios";

export interface SendEmailCredentials {
    to_email: string;
    id: string;
  }


export interface SendEmailResponse {
result: {
    success: boolean
}
}
  
  
export const handleSendEmailMutation = async (credentials: SendEmailCredentials) => {

        try {
            const response = await axios.post(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_SEND_EMAIL_ROUTE, credentials
            )

        if (response.status === 200 || response.status === 201) {

                const recv_data = response.data as SendEmailResponse
                return recv_data
            } else {
                    return {result: {success: false} , error_message: response.data.error_message}
            }

        } catch(err) {
            return {result: {success: false} , error_message: "Some Error Occured"}
        }

}