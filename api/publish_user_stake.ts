import { CHECK_STAKE_STATUS_ROUTE, GAME_ROUTE, PUBLISH_USER_STAKE_ROUTE, UPDATE_PLAYER_STAKE_ROUTE, VORTEX_PUB_SUB_URL } from "./constants";
import axios from 'axios'
  
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
message: string,
}

//User stake represent staked by user on a player
// While Player stake function represents the bet player made on himself
export const handlePublishUserStakeMutation = async ( details: PublishUserStakeMutation) => {


        try {
            const response = await axios.post(
                VORTEX_PUB_SUB_URL + GAME_ROUTE + PUBLISH_USER_STAKE_ROUTE, details
            )

            if (response.status === 200 || response.status === 201) {
                const recv_data = response.data as PublishUserStakeResponse

                return recv_data
            } else {
                return {result: {success: false} , error_message: "Some Error Occured"}
            }

        } catch(err) {
            return {result: {success: false} , error_message: "Some Error Occured"}
        }



}