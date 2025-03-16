import axios from 'axios'
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_LOGIN_ROUTE } from "./constants";
import { save_user_details } from '@/store/store';
export interface LoginCredentials {
    usernameoremail: string;
    pwd: string;
  }


export interface LoginResponse {
result: {
    success: boolean
}
token: string;
user: {
    id: string;
    email: string;
    name: string;
    score: number;
    verified: boolean;
    username: string;
    first_name: string;
    last_name: string
};
}
  
  
export const handleLoginCall = async (credentials: LoginCredentials) => {

    try {

     const res =    await axios.post(
            MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_LOGIN_ROUTE, credentials
        )


        if (res.status === 200 || res.status === 201) {

            console.log("Recieved data for login is")
            console.log(res.data)

            let recv_data = res.data as LoginResponse
            
            save_user_details(recv_data.token , recv_data.user.id)

            return {result: { success: true} , data: recv_data.user}

        } else {
            return {result: {success: false} , error_message: "Invalid Credentials"}
        }


    } catch(err) {
        return {result: {success: false} , error_message: "Some Error Occured"}
    }
 
            
}