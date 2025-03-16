export const MESSIER_BASE_URL = process.env.MESSIER_BASE_URL || "https://53e6-2401-4900-1cba-3dc3-87-623c-ede9-94a.ngrok-free.app"
export const VORTEX_PUB_SUB_URL = process.env.VORTEX_PUB_SUB_URL || "http://localhost:4001"
export const NEBULA_BASE_URL = process.env.NEBULA_BASE_URL || "http://localhost:3020"

//group routes
export const USER_AUTH_ROUTE = "/api/v1/auth"
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



