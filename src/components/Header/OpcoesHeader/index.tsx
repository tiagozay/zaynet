import React from 'react';
import './OpcoesHeader.css';
import { useState } from 'react';
import ModalSolicitacoesDeAmizade from './ModalSolicitacoesDeAmizade';

export default function OpcoesHeader() {

    const [modalSolicitacoesDeAmizadeAberto, setModalSolicitacoesDeAmizadeAberto] = useState<boolean>(false);

    function clickTecla(e: KeyboardEvent)
    {
        if(e.key === 'Escape'){
            setModalSolicitacoesDeAmizadeAberto(false);
        }
    }

    function fecharModais()
    {
        setModalSolicitacoesDeAmizadeAberto(false);
    }

    function clickSolicitacoesDeAmizade()
    {
        setModalSolicitacoesDeAmizadeAberto(!modalSolicitacoesDeAmizadeAberto);
    }

    document.addEventListener('keydown', clickTecla);

    return (
        <div id='opcoesHeader'>
            <i className={`
                material-symbols-outlined
                opcoesHeaderIcone 
                ${modalSolicitacoesDeAmizadeAberto && "opcoesHeaderIcone__ativo"}
            `} onClick={clickSolicitacoesDeAmizade}>group_add</i>
            <i className={`
                material-symbols-outlined 
                opcoesHeaderIcone
            `}>chat_bubble</i>
            <i className={`
                material-symbols-outlined 
                opcoesHeaderIcone
            `}>notifications</i>
            <i className='opcoesHeaderIcone' id='opcoesHeaderIcone__perfil'>
                <img src="imagensDinamicas/perfil.jpg" alt="" />
            </i>
            <ModalSolicitacoesDeAmizade aberto={modalSolicitacoesDeAmizadeAberto} clickFora={fecharModais}/>
        </div>
    )
}
