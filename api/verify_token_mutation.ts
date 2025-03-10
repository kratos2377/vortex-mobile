import { useMutation } from "@tanstack/react-query"
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_SEND_EMAIL_ROUTE, USER_VERIFY_TOKEN_ROUTE, USER_VERIFY_USER_ROUTE } from "./constants";
import { save_user_details } from "../store/store";
import { UserModel } from "../store/models";
import { useUserStore } from "../store/user_state";

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
  
  
export const useVerifyTokenMutation = () => {

    const {user_details} = useUserStore()

    const verifyTokenMutation = useMutation({
        mutationFn: async (credentials: VerifyTokenCredentials) => {
            const response = await fetch(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_VERIFY_TOKEN_ROUTE,
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
        
              const data = await response.json() as VerifyTokenMutationResponse;
                          
              return data;
        },

        onSuccess: (data) => {
            console.log('Verify Token Mutation successful:' );
            return {result: { success: true} , data: data}
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Verify Token Mutation failed:', error);
            return {result: {success: false} , message: error}
          },


        
    })

    return verifyTokenMutation;
}