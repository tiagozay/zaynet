import React from 'react';
import './OpcoesHeader.css';
import { useState, useEffect } from 'react';
import ModalSolicitacoesDeAmizade from './ModalSolicitacoesDeAmizade';
import ModalMensagens from './ModalMensagens';
import ModalNotificacoes from './ModalNotificacoes';
import OpcaoHeader from './OpcaoHeader';
import { TAMANHO_DE_TELA_MOBILE } from '../../../config';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ModalOpcoesConta from './ModalOpcoesConta';

export default function OpcoesHeader() {

    const [modalSolicitacoesDeAmizadeAberto, setModalSolicitacoesDeAmizadeAberto] = useState<boolean>(false);
    const [modalMensagensAberto, setModalMensagensAberto] = useState<boolean>(false);
    const [modalNotificacoesAberto, setModalNotificacoesAberto] = useState<boolean>(false);

    const isMobile = useMediaQuery({maxWidth: TAMANHO_DE_TELA_MOBILE});

    useEffect(() => {
        if (isMobile) {
            fecharModais();
        }
    }, [isMobile])

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

            {
                isMobile &&
                <>
                    <OpcaoHeader
                        nomeDoIcone='home'
                        indicadorLayoutMobile={true}
                        caminhoParaLinkMobile='/'
                    />

                    <OpcaoHeader
                        nomeDoIcone='group_add'
                        indicadorLayoutMobile={true}
                        caminhoParaLinkMobile='/adicionarAmigos'
                    />

                </>
            }
            <OpcaoHeader
                nomeDoIcone='group'
                indicadorLayoutMobile={isMobile}
                caminhoParaLinkMobile='/solicitacoesDeAmizade'
                indicadorModalAbertoLayoutPc={modalSolicitacoesDeAmizadeAberto}
                funcaoAbrirModalLayoutPC={clickSolicitacoesDeAmizade}
            />
            <OpcaoHeader
                nomeDoIcone='chat_bubble'
                indicadorLayoutMobile={isMobile}
                caminhoParaLinkMobile='/mensagens'
                indicadorModalAbertoLayoutPc={modalMensagensAberto}
                funcaoAbrirModalLayoutPC={clickMensagens}
            />
            <OpcaoHeader
                nomeDoIcone='notifications'
                indicadorLayoutMobile={isMobile}
                caminhoParaLinkMobile='/notificacoes'
                indicadorModalAbertoLayoutPc={modalNotificacoesAberto}
                funcaoAbrirModalLayoutPC={clickNotificacoes}
            />

            <ModalOpcoesConta />

            {/* <Link to='/perfil' className='opcoesHeaderIcone' id='opcoesHeaderIcone__perfil'>
                <img src="./../imagensDinamicas/perfil.jpg" alt="" />
            </Link> */}
            <ModalSolicitacoesDeAmizade aberto={modalSolicitacoesDeAmizadeAberto} clickFora={fecharModais} />
            <ModalMensagens aberto={modalMensagensAberto} clickFora={fecharModais} />
            <ModalNotificacoes aberto={modalNotificacoesAberto} clickFora={fecharModais} />
        </div>
    )
}
