import { useMutation } from "@tanstack/react-query"
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_LOGIN_ROUTE } from "./constants";
import { save_user_details } from "../store/store";
import { UserModel } from "../store/models";
import { useUserStore } from "../store/user_state";

export interface LoginCredentials {
    usernameoremail: string;
    password: string;
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
            const response = await fetch(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_LOGIN_ROUTE,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                }
            )


            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        
              const data = await response.json() as LoginResponse;
            
              save_user_details(data.token , data.user.id)
              
              let user_mod: UserModel = {
                  id: data.user.id,
                  username: data.user.username,
                  email: data.user.email,
                  first_name: data.user.first_name,
                  last_name: data.user.last_name,
                  score: data.user.score,
                  verified: data.user.verified
              }

              updateUserDetails(user_mod)
              
              return data;
        },

        onSuccess: (data) => {
            console.log('Login successful:', data);
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Login failed:', error);
          },

        
    })

    return loginMutation;
}