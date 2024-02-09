import { chownSync } from "fs";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface ControleLoginContext
{
    permisaoParaIniciar: boolean,
    setPermisaoParaIniciar: React.Dispatch<React.SetStateAction<boolean>>
}

export const ControleLoginContext = createContext<ControleLoginContext>({
    permisaoParaIniciar: false,
    setPermisaoParaIniciar: () => {}
}); 

export default function ControleLoginContextProvider({children}: {children: ReactNode}){

    const [permisaoParaIniciar, setPermisaoParaIniciar] = useState<boolean>(false);

    return (
        <ControleLoginContext.Provider value={{
            permisaoParaIniciar,
            setPermisaoParaIniciar
        }}>
            {children}
        </ControleLoginContext.Provider>
    );
}