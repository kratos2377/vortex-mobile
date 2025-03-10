import { useMutation } from "@tanstack/react-query"
import { MESSIER_BASE_URL, USER_AUTH_ROUTE, USER_SEND_EMAIL_ROUTE } from "./constants";
import { save_user_details } from "../store/store";
import { UserModel } from "../store/models";
import { useUserStore } from "../store/user_state";

export interface SendEmailCredentials {
    to_email: string;
    id: string;
  }


export interface SendEmailResponse {
result: {
    success: boolean
}
}
  
  
export const useSendEmailMutation = () => {

    const {user_details} = useUserStore()

    const sendEmailMutation = useMutation({
        mutationFn: async (credentials: SendEmailCredentials) => {
            const response = await fetch(
                MESSIER_BASE_URL + USER_AUTH_ROUTE + USER_SEND_EMAIL_ROUTE,
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
        
              const data = await response.json() as SendEmailResponse;
                          
              return data;
        },

        onSuccess: () => {
            console.log('Send Email Mutation successful:' );
            return {result: { success: true} }
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Send Email Mutation failed:', error);
            return {result: {success: false} , message: error}
          },


        
    })

    return sendEmailMutation;
}