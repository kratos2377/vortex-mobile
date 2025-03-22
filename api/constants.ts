export const MESSIER_BASE_URL = process.env.MESSIER_BASE_URL || "https://5aa0-2401-4900-1cba-9045-1fb0-5c85-9bd-186d.ngrok-free.app"
export const VORTEX_PUB_SUB_URL = process.env.VORTEX_PUB_SUB_URL || "https://e9e8-2401-4900-1cba-9045-1fb0-5c85-9bd-186d.ngrok-free.app"
export const NEBULA_BASE_URL = process.env.NEBULA_BASE_URL || "https://6be2-2401-4900-1cba-9045-1fb0-5c85-9bd-186d.ngrok-free.app"

//group routes
export const USER_AUTH_ROUTE = "/api/v1/auth"
export const USER_LOGIC_ROUTE = "/api/v1/user"
export const GAME_BET_ROUTE = "/api/v1/game_bets"
export const GAME_ROUTE = "/api/v1/game"


//routes
export const USER_LOGIN_ROUTE = "/login"
export const USER_REGISTRATION_ROUTE = "/registration"
export const USER_SEND_EMAIL_ROUTE = "/send_email"
export const USER_VERIFY_USER_ROUTE = "/verify_user"
export const USER_VERIFY_TOKEN_ROUTE = "/verify_token"
export const CHECK_STAKE_STATUS_ROUTE = "/check_stake_status"
export const UPDATE_PLAYER_STAKE_ROUTE = "/update_player_stake"
export const PUBLISH_USER_STAKE_ROUTE = "/publish_user_stake"
export const GET_USER_BETS_ROUTE = "/get_user_bets"
export const CHANGE_USER_PASSWORD_ROUTE = "/change_user_password"



