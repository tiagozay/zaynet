import { chownSync } from "fs";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface TypeCompartilharPublicacaoContext {
    indicadorModalCompartilharPublicacaoAberto: boolean,
    setIndicadorModalCompartilharPublicacaoAberto: React.Dispatch<React.SetStateAction<boolean>>,
    idPublicacaoCompartilhada: number | null,
    setIdPublicacaoCompartilhada: React.Dispatch<React.SetStateAction<number | null>>,
    textoDigitado: string | null,
    setTextoDigitado: React.Dispatch<React.SetStateAction<string | null>>
}

export const CompartilharPublicacaoContext = createContext<TypeCompartilharPublicacaoContext>({
    indicadorModalCompartilharPublicacaoAberto: false,
    setIndicadorModalCompartilharPublicacaoAberto: () => { },
    idPublicacaoCompartilhada: null,
    setIdPublicacaoCompartilhada: () => { },
    textoDigitado: null,
    setTextoDigitado: () => { }
});

export default function CompartilharPublicacaoContextProvider({ children }: { children: ReactNode }) {

    const [indicadorModalCompartilharPublicacaoAberto, setIndicadorModalCompartilharPublicacaoAberto] = useState(false);

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);

    const [idPublicacaoCompartilhada, setIdPublicacaoCompartilhada] = useState<number | null>(null);
    
    useEffect(() => {

        if(!indicadorModalCompartilharPublicacaoAberto){
            setTextoDigitado(null);
            setIdPublicacaoCompartilhada(null);
        }

    }, [indicadorModalCompartilharPublicacaoAberto]);

    return (
        <CompartilharPublicacaoContext.Provider value={{
            indicadorModalCompartilharPublicacaoAberto,
            setIndicadorModalCompartilharPublicacaoAberto,
            idPublicacaoCompartilhada,
            setIdPublicacaoCompartilhada,
            textoDigitado,
            setTextoDigitado
        }}>
            {children}
        </CompartilharPublicacaoContext.Provider>
    );
}