import { useMutation } from "@tanstack/react-query";
import { CHECK_STAKE_STATUS_ROUTE, GAME_ROUTE, VORTEX_PUB_SUB_URL } from "./constants";

  
export interface CheckStakeStatusMutation {
    user_who_is_betting: string;
    user_betting_on: string;
    game_id: string;
    bet_type: string;
  }


export interface CheckStakeStatusResponse {
result: {
    success: boolean
}
type: string | undefined | null,
session_id: string
}


export const useCheckStakeStatusMutation = () => {


    const checkStakeStatusMutation = useMutation({
        mutationFn: async (details: CheckStakeStatusMutation) => {
            const response = await fetch(
                VORTEX_PUB_SUB_URL + GAME_ROUTE + CHECK_STAKE_STATUS_ROUTE,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(details)
                }
            )


            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        
              const data = await response.json() as CheckStakeStatusResponse;
                          
              return data;
        },
        onSuccess: (data) => {
            console.log('Login successful:', data);
            return data
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Login failed:', error);
            return {result: {success: false} , message: error}
          },

        
    })

    return checkStakeStatusMutation;
}