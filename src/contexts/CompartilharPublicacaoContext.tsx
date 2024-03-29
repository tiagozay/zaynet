import { chownSync } from "fs";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { PublicacaoModel } from "../models/Publicacao/PublicacaoModel";

interface TypeCompartilharPublicacaoContext {
    indicadorModalCompartilharPublicacaoAberto: boolean,
    setIndicadorModalCompartilharPublicacaoAberto: React.Dispatch<React.SetStateAction<boolean>>,
    publicacaoCompartilhada: PublicacaoModel | null,
    setPublicacaoCompartilhada: React.Dispatch<React.SetStateAction<PublicacaoModel | null>>,
    textoDigitado: string | null,
    setTextoDigitado: React.Dispatch<React.SetStateAction<string | null>>
}

export const CompartilharPublicacaoContext = createContext<TypeCompartilharPublicacaoContext>({
    indicadorModalCompartilharPublicacaoAberto: false,
    setIndicadorModalCompartilharPublicacaoAberto: () => { },
    publicacaoCompartilhada: null,
    setPublicacaoCompartilhada: () => { },
    textoDigitado: null,
    setTextoDigitado: () => { }
});

export default function CompartilharPublicacaoContextProvider({ children }: { children: ReactNode }) {

    const [indicadorModalCompartilharPublicacaoAberto, setIndicadorModalCompartilharPublicacaoAberto] = useState(false);

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);

    const [publicacaoCompartilhada, setPublicacaoCompartilhada] = useState<PublicacaoModel | null>(null);
    
    useEffect(() => {

        if(!indicadorModalCompartilharPublicacaoAberto){
            setTextoDigitado(null);
            setPublicacaoCompartilhada(null);
        }

    }, [indicadorModalCompartilharPublicacaoAberto]);

    return (
        <CompartilharPublicacaoContext.Provider value={{
            indicadorModalCompartilharPublicacaoAberto,
            setIndicadorModalCompartilharPublicacaoAberto,
            publicacaoCompartilhada,
            setPublicacaoCompartilhada,
            textoDigitado,
            setTextoDigitado
        }}>
            {children}
        </CompartilharPublicacaoContext.Provider>
    );
}