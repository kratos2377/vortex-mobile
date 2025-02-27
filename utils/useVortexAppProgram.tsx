import { STABLE_POOL_IDL, STABLE_POOL_PROGRAM_ID } from "@/constants/const";
import { Idl, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { useMemo, useState } from "react";

export function UseVortexAppProgram(key: PublicKey) {
    const vortexProgramId = STABLE_POOL_PROGRAM_ID

    const [connection] = useState(
        () => new Connection("https://api.devnet.solana.com")
      );


const [vortexAppPDA] = useMemo(() => {
        const counterSeed = key.toBuffer();
        return PublicKey.findProgramAddressSync([counterSeed], vortexProgramId);
      }, [vortexProgramId]);
    

      const vortexAppProgram = useMemo(() => {
        return new Program(STABLE_POOL_IDL as Idl, vortexProgramId, { connection });
      }, [vortexProgramId]);
    
      const value = useMemo(
        () => ({
          vortexAppProgram: vortexAppProgram,
          vortexProgramId: vortexProgramId,
          vortexAppPDA: vortexAppPDA,
        }),
        [vortexAppProgram, vortexProgramId, vortexAppPDA]
      );
    
    
      return { value, vortexAppProgram, vortexAppPDA };


}