import axios from "axios";
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


export const handleUpdatePlayerStakeMutation = async (details: UpdatePlayerStakeMutation) => {

    try {
        
        const response = await axios.post(
            VORTEX_PUB_SUB_URL + GAME_ROUTE + UPDATE_PLAYER_STAKE_ROUTE, details
        )


    if (response.status === 200 || response.status === 201) {

            const recv_data = response.data as UpdatePlayerStakeResponse
            return recv_data
        } else {
                return {result: {success: false} , error_message: response.data.error_message}
        }
    } catch(err) {
        return {result: {success: false} , error_message: "Some Error Occured"}
    }


}