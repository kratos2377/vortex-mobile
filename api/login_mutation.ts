import { useMutation } from "@tanstack/react-query"
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_LOGIN_ROUTE } from "./constants";
import { save_user_details } from "../store/store";
import { UserModel } from "../store/models";
import { useUserStore } from "../store/user_state";

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
  
  
export const useLogin = () => {

    const {updateUserDetails} = useUserStore()

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
          let res = await fetch(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_LOGIN_ROUTE,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                }
            )

            console.log("RESPONSE FOR LOGIN AUTH ROUTE IS")
            console.log(res)
            return res


           
        },

        onSuccess: async (data) => {
            console.log('Login successful:', data);

            const user_data = await data.json() as LoginResponse;

            console.log("Login response is")
            console.log(user_data)
          
            save_user_details(user_data.token , user_data.user.id)
            
            let user_mod: UserModel = {
                id: user_data.user.id,
                username: user_data.user.username,
                email: user_data.user.email,
                first_name: user_data.user.first_name,
                last_name: user_data.user.last_name,
                score: user_data.user.score,
                verified: user_data.user.verified
            }

            updateUserDetails(user_mod)

            return Promise.all([{result: { success: true} , data: user_data.user}])
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Login failed:', error);
        
            return Promise.all([{result: {success: false} , message: error}])
          },


        
    },

    
)

    return loginMutation;
}