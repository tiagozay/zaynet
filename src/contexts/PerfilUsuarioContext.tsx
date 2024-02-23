import React, { ReactNode, createContext, useState } from "react";
import { ConversaModel } from "../models/ConversaModel";
import { Usuario } from "../models/Usuario";
import { PublicacaoModel } from "../models/Publicacao/PublicacaoModel";
import { PublicacaoCompartilhadaModel } from "../models/Publicacao/PublicacaoCompartilhadaModel";
import { MidiaPublicacaoModel } from "../models/Publicacao/MidiaPublicacaoModel";

interface TypePerfilUsuarioContext
{
    indicadorUsuarioCarregando: boolean,
    setIndicadorUsuarioCarregando: React.Dispatch<React.SetStateAction<boolean>>,
    indicadorPublicacoesDoUsuarioCarregando: boolean,
    setIndicadorPublicacoesDoUsuarioCarregando: React.Dispatch<React.SetStateAction<boolean>>,
    usuario: Usuario | null,
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>,
    publicacoes: Array<PublicacaoModel | PublicacaoCompartilhadaModel>,
    setPublicacoes: React.Dispatch<React.SetStateAction<Array<PublicacaoModel | PublicacaoCompartilhadaModel>>>,
    imagens: Array<MidiaPublicacaoModel>,
    setImagens: React.Dispatch<React.SetStateAction<Array<MidiaPublicacaoModel>>>
}

export const PerfilUsuarioContext = createContext<TypePerfilUsuarioContext>({
    indicadorUsuarioCarregando: false,
    setIndicadorUsuarioCarregando: () => {},
    indicadorPublicacoesDoUsuarioCarregando: false,
    setIndicadorPublicacoesDoUsuarioCarregando: () => {},
    usuario: null,
    setUsuario: () => {},
    publicacoes: [],
    setPublicacoes: () => {},
    imagens: [],
    setImagens: () => {}
}); 

export default function PerfilUsuarioContextProvider({children}: {children: ReactNode}){

    const [indicadorUsuarioCarregando, setIndicadorUsuarioCarregando] = useState<boolean>(false);

    const [indicadorPublicacoesDoUsuarioCarregando, setIndicadorPublicacoesDoUsuarioCarregando] = useState<boolean>(false);

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    
    const [publicacoes, setPublicacoes] = useState<Array<PublicacaoModel | PublicacaoCompartilhadaModel>>([]);

    const [imagens, setImagens] = useState<Array<MidiaPublicacaoModel>>([]);

    return (
        <PerfilUsuarioContext.Provider value={{
            indicadorUsuarioCarregando,
            setIndicadorUsuarioCarregando,
            indicadorPublicacoesDoUsuarioCarregando,
            setIndicadorPublicacoesDoUsuarioCarregando,
            usuario,
            setUsuario,
            publicacoes,
            setPublicacoes,
            imagens,
            setImagens
        }}>
            {children}
        </PerfilUsuarioContext.Provider>
    );
}