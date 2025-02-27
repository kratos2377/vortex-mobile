import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

 

export function getVortexStateKey(
	programId: PublicKey,
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('vortex_state'),
		],
		programId
	)[0];
}

export function getVortexSignerKey(
	programId: PublicKey,
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('vortex_signer'),
		],
		programId
	)[0];
}



export function getGameAccountPublicKey(
	programId: PublicKey,
	game_id_buffer: Uint8Array,
    session_id_buffer: Uint8Array
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('game'),
            game_id_buffer,
            session_id_buffer
		],
		programId
	)[0];
}

export function getGameVaultccountPublicKey(
	programId: PublicKey,
	game_id_buffer: Uint8Array,
    session_id_buffer: Uint8Array
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('game_vault'),
            game_id_buffer,
            session_id_buffer
		],
		programId
	)[0];
}

export function getPlayerBetAccountKey(
	programId: PublicKey,
	game_id_buffer: Uint8Array,
	user_betting_on_id: Uint8Array,
    session_id_buffer: Uint8Array
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('player_bet'),
            game_id_buffer,
			user_betting_on_id,
            session_id_buffer
		],
		programId
	)[0];
}


export function getUserGameBetAccountKey(
	programId: PublicKey,
	game_id_buffer: Uint8Array,
	user_betting_on_id: Uint8Array,
	payerKey: PublicKey,
    session_id_buffer: Uint8Array
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from('user_game_bet'),
            game_id_buffer,
			user_betting_on_id,
			payerKey.toBuffer(),
            session_id_buffer
		],
		programId
	)[0];
}


export const uint8ArrayToBuffer = (str: string) => {
    return Buffer.from(str.replace(/-/g, ''), 'hex');
}

export const stringToBuffer = (str: string) => {
    return Buffer.from(str , 'utf-8');
}
