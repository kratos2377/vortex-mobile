import { useMutation } from "@tanstack/react-query"
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_SEND_EMAIL_ROUTE, USER_VERIFY_USER_ROUTE } from "./constants";
import { save_user_details } from "../store/store";
import { UserModel } from "../store/models";
import { useUserStore } from "../store/user_state";

export interface VerifyCodeMutationCredentials {
    user_key: string;
    id: string;
  }


export interface VerifyCodeMutationResponse {
result: {
    success: boolean
}
}
  
  
export const useVerifyCodeMutation = () => {

    const {user_details} = useUserStore()

    const verifyCodeMutation = useMutation({
        mutationFn: async (credentials: VerifyCodeMutationCredentials) => {
            const response = await fetch(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_VERIFY_USER_ROUTE,
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
        
              const data = await response.json() as VerifyCodeMutationResponse;
                          
              return data;
        },

        onSuccess: () => {
            console.log('Verify Code Mutation successful:' );
            return {result: { success: true} }
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Verify Code Mutation failed:', error);
            return {result: {success: false} , message: error}
          },


        
    })

    return verifyCodeMutation;
}