import React from 'react';
import './OpcoesHeader.css';
import { useState } from 'react';
import ModalSolicitacoesDeAmizade from './ModalSolicitacoesDeAmizade';

export default function OpcoesHeader() {

    const [modalSolicitacoesDeAmizadeAberto, setModalSolicitacoesDeAmizadeAberto] = useState<boolean>(false);
    const [modalMensagensAberto, setModalMensagensAberto] = useState<boolean>(false);
    const [modalNotificacoesAberto, setModalNotificacoesAberto] = useState<boolean>(false);

    function clickTecla(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            fecharModais();
        }
    }

    function fecharModais() {
        setModalSolicitacoesDeAmizadeAberto(false);
        setModalMensagensAberto(false);
        setModalNotificacoesAberto(false);
    }

    function clickSolicitacoesDeAmizade() {
        setModalSolicitacoesDeAmizadeAberto(!modalSolicitacoesDeAmizadeAberto);
    }

    function clickMensagens() {
        setModalMensagensAberto(!modalMensagensAberto);
    }

    function clickNotificacoes() {
        setModalNotificacoesAberto(!modalNotificacoesAberto);
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
                ${modalMensagensAberto && "opcoesHeaderIcone__ativo"}
            `} onClick={clickMensagens}>chat_bubble</i>
            <i className={`
                material-symbols-outlined 
                opcoesHeaderIcone
                ${modalNotificacoesAberto && "opcoesHeaderIcone__ativo"}
            `} onClick={clickNotificacoes}>notifications</i>
            <i className='opcoesHeaderIcone' id='opcoesHeaderIcone__perfil'>
                <img src="imagensDinamicas/perfil.jpg" alt="" />
            </i>
            <ModalSolicitacoesDeAmizade aberto={modalSolicitacoesDeAmizadeAberto} clickFora={fecharModais} />
        </div>
    )
}
