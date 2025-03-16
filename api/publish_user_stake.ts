import { useMutation } from "@tanstack/react-query";
import { CHECK_STAKE_STATUS_ROUTE, GAME_ROUTE, PUBLISH_USER_STAKE_ROUTE, UPDATE_PLAYER_STAKE_ROUTE, VORTEX_PUB_SUB_URL } from "./constants";

  
export interface PublishUserStakeMutation {
    user_username_who_is_betting: string;
    user_who_is_betting: string;
    user_betting_on: string;
    game_id: string;
    bet_type: string;
    amount: number;
    session_id: string;
    event_type: string;
  }


export interface PublishUserStakeResponse {
result: {
    success: boolean
}
message: string
}

//User stake represent staked by user on a player
// While Player stake function represents the bet player made on himself
export const usePublishUserStake = () => {


    const publishUserStakeMutation = useMutation({
        mutationFn: async (details: PublishUserStakeMutation) => {
            const response = await fetch(
                VORTEX_PUB_SUB_URL + GAME_ROUTE + PUBLISH_USER_STAKE_ROUTE,
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
        
              const data = await response.json() as PublishUserStakeResponse;
                          
              return data;
        },

        onSuccess: (data) => {
            console.log('Publish user stake successful:', data);
            return data
          },
          onError: (error) => {
            // Handle errors appropriately
            console.error('Login failed:', error);
            return {result: {success: false} , message: error}
          },

        
    })

    return publishUserStakeMutation;
}