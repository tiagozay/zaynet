import React, { ReactNode, createContext, useState } from "react";
import { ConversaModel } from "../models/ConversaModel";

interface TypeCaixaDeMensagemContext
{
    estadoCaixaDeMensagem: 'Aberto' | "Minimizado" | false
    conversaAberta: ConversaModel | null,
    abrirChat: (conversa? : ConversaModel) => void,
    minimizarChat: () => void,
    fecharChat: () => void,
}

export const CaixaDeMensagemContext = createContext<TypeCaixaDeMensagemContext>({
    estadoCaixaDeMensagem: false,
    conversaAberta: null,
    abrirChat: () => {},
    minimizarChat: () => {},
    fecharChat: () => {},
}); 

export default function CaixaDeMensagemProvider({children}: {children: ReactNode}){

    const [estadoCaixaDeMensagem, setEstadoCaixaDeMensagem] = useState<'Aberto' | "Minimizado" | false>(false);

    const [conversaAberta, setConversaAberta] = useState<ConversaModel | null>(null);

    function abrirChat(conversa?: ConversaModel)
    {
        setEstadoCaixaDeMensagem("Aberto");

        //Verifica se caso não estiver vindo nenhuma conversa como argumento e não tiver definida no state, da erro, e caso não venha nada e já tiver definida, deixa como está pois é sinal que está abrindo uma conversa minimizada.
        if(!conversa && !conversaAberta){
            throw new Error("Nenhuma conversa foi passada");
        }else if(conversa){
            setConversaAberta(conversa);
        }
    }
    
    function minimizarChat()
    {
        setEstadoCaixaDeMensagem("Minimizado");
    }

    function fecharChat()
    {
        setEstadoCaixaDeMensagem(false);
        setConversaAberta(null);
    }

    return (
        <CaixaDeMensagemContext.Provider value={{
            estadoCaixaDeMensagem,
            conversaAberta,
            abrirChat,
            minimizarChat,
            fecharChat
        }}>
            {children}
        </CaixaDeMensagemContext.Provider>
    );
}