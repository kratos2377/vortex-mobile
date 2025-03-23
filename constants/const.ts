import { clusterApiUrl, PublicKey } from '@solana/web3.js'
import vortex from "@/idl/vortex_contracts.json"
export const SOLANA_HOST = clusterApiUrl('devnet')

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
  '8Wp69Tg8PZw7Acr6DAtroYrkUt4yuvvPd8nWqYD2sJJn'
)

export const STABLE_POOL_IDL = vortex

export const SOL_MINT_ADDRESS = new PublicKey("So11111111111111111111111111111111111111112")

export const adminPubKey = new PublicKey("4SxWFybWqHYYpMXaf1uByp1AgBV8vi8vn7mp7yLAXsH3")

export const USDC_MINT_ADDRESS = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

export const VORTEX_WALLET_ADDRESS = new PublicKey("4SeSw6t5H8xFn8rLXLyo2rVAJeDXBimU5Nybw2zm95LJ")

export const USDC_MINT_TOKEN_DECIMALS = 1000000