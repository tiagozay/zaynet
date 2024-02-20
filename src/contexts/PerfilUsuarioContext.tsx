import React, { ReactNode, createContext, useState } from "react";
import { ConversaModel } from "../models/ConversaModel";

interface TypePerfilUsuarioContext
{
    indicadorUsuarioCarregando: boolean,
    setIndicadorUsuarioCarregando: React.Dispatch<React.SetStateAction<boolean>>
}

export const PerfilUsuarioContext = createContext<TypePerfilUsuarioContext>({
    indicadorUsuarioCarregando: false,
    setIndicadorUsuarioCarregando: () => {}
}); 

export default function PerfilUsuarioContextProvider({children}: {children: ReactNode}){

    const [indicadorUsuarioCarregando, setIndicadorUsuarioCarregando] = useState<boolean>(false);

    return (
        <PerfilUsuarioContext.Provider value={{
            indicadorUsuarioCarregando,
            setIndicadorUsuarioCarregando,
        }}>
            {children}
        </PerfilUsuarioContext.Provider>
    );
}