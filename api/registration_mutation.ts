import { save_user_details } from "@/store/store";
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_LOGIN_ROUTE, USER_REGISTRATION_ROUTE } from "./constants";
import axios from "axios";

export interface RegistrationCredentials {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }


export interface RegistrationResponse {
result: {
    success: boolean
},
token: string,
user: {
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
  
  
export const handleUserRegistrationCall = async (credentials: RegistrationCredentials) => {

 
        try {
            const response = await axios.post(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_REGISTRATION_ROUTE, credentials
            )



            if (response.status === 200 || response.status === 201) {

                const recv_data = response.data as RegistrationResponse
                      save_user_details(recv_data.token , recv_data.user.id)
                return recv_data
            } else {
                    return {result: {success: false} , error_message: response.data.error_message}
            }
        } catch(err) {
            return {result: {success: false} , error_message: "Some Error Occured"}
        }


}