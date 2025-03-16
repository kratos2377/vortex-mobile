import axios from 'axios'
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
session_id: string,
error_message: string |  undefined | null
}


export const handleCheckStatusMutation = async (details: CheckStakeStatusMutation) => {

        try {
            
            const response = await axios.post(
                VORTEX_PUB_SUB_URL + GAME_ROUTE + CHECK_STAKE_STATUS_ROUTE, details
            )

            const recv_data = response.data as CheckStakeStatusResponse

            if(response.status === 200 || response.status === 201) {
                return recv_data
            } else {
                return {result: {success: false} , error_message: recv_data.error_message}
            }

        } catch(err) {
            return {result: {success: false} , error_message: "Some Error Occured"}
        }

}