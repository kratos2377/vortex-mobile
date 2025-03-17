

export type UserModel = {
    id: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    score: number,
    verified: boolean,
}

export type GameBet = {
    id: string;
    user_id: string;
    game_id: string;
    user_id_betting_on: string;
    session_id: string;
    game_name: string;
    bet_amount: number;
    status: string;
    encrypted_wallet: string;
    is_player: boolean;
    is_game_valid: boolean;
    won_status: boolean;
    created_at: Date;
    updated_at: Date;
  }