import { useMutation } from "@tanstack/react-query";
import { CHECK_STAKE_STATUS_ROUTE, GAME_ROUTE, UPDATE_PLAYER_STAKE_ROUTE, VORTEX_PUB_SUB_URL } from "./constants";

  
export interface UpdatePlayerStakeMutation {
    username: string;
    user_id: string;
    game_id: string;
    bet_type: string;
    amount: number;
    session_id: string;
    wallet_key: string;
    is_replay: boolean,
    is_match: boolean,
  }


export interface UpdatePlayerStakeResponse {
result: {
    success: boolean
}
message: string
}


export const useUpdatePlayerStakeMutation = () => {


    const updatePlayerStakeResponse = useMutation({
        mutationFn: async (details: UpdatePlayerStakeMutation) => {
            const response = await fetch(
                VORTEX_PUB_SUB_URL + GAME_ROUTE + UPDATE_PLAYER_STAKE_ROUTE,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(details)
                }
            )


            if (response.status.toString() !== "200" && response.status.toString() !== "201") {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        
              const data = await response.json() as UpdatePlayerStakeResponse;
                          
              return data;
        },

        onSuccess: (data) => {
            console.log('UpdatePlayerStake Mutation successful:', data);
            return {result: {success: true} }
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('UpdatePlayerStake Mutation failed:', error);
            return {result: {success: false} , message: error}
          },

        
    })

    return updatePlayerStakeResponse;
}