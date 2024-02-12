import React, { ReactNode, createContext, useEffect, useState } from "react";
import { PublicacaoModel } from "../models/Publicacao/PublicacaoModel";
import { PublicacaoCompartilhadaModel } from "../models/Publicacao/PublicacaoCompartilhadaModel";

interface TypeEditarPublicacaoContext {
    indicadorModalEditarPublicacaoAberto: boolean,
    setIndicadorModalEditarPublicacaoAberto: React.Dispatch<React.SetStateAction<boolean>>,
    publicacaoEditada: PublicacaoModel | PublicacaoCompartilhadaModel | null,
    setPublicacaoEditada: React.Dispatch<React.SetStateAction<PublicacaoModel | PublicacaoCompartilhadaModel | null>>,
    textoDigitado: string | null,
    setTextoDigitado: React.Dispatch<React.SetStateAction<string | null>>
}

export const EditarPublicacaoContext = createContext<TypeEditarPublicacaoContext>({
    indicadorModalEditarPublicacaoAberto: false,
    setIndicadorModalEditarPublicacaoAberto: () => { },
    publicacaoEditada: null,
    setPublicacaoEditada: () => { },
    textoDigitado: null,
    setTextoDigitado: () => { }
});

export default function EditarPublicacaoContextProvider({ children }: { children: ReactNode }) {

    const [indicadorModalEditarPublicacaoAberto, setIndicadorModalEditarPublicacaoAberto] = useState(false);

    const [textoDigitado, setTextoDigitado] = useState<string | null>(null);

    const [publicacaoEditada, setPublicacaoEditada] = useState<PublicacaoModel | PublicacaoCompartilhadaModel | null>(null);
    
    useEffect(() => {

        if(!indicadorModalEditarPublicacaoAberto){
            setTextoDigitado(null);
            setPublicacaoEditada(null);
        }

    }, [indicadorModalEditarPublicacaoAberto]);

    return (
        <EditarPublicacaoContext.Provider value={{
            indicadorModalEditarPublicacaoAberto,
            setIndicadorModalEditarPublicacaoAberto,
            publicacaoEditada,
            setPublicacaoEditada,
            textoDigitado,
            setTextoDigitado,
        }}>
            {children}
        </EditarPublicacaoContext.Provider>
    );
}