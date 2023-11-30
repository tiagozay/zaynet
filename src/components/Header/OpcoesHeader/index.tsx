import React from 'react';
import './OpcoesHeader.css';
import { useState, useEffect } from 'react';
import ModalSolicitacoesDeAmizade from './ModalSolicitacoesDeAmizade';
import ModalMensagens from './ModalMensagens';
import ModalNotificacoes from './ModalNotificacoes';
import OpcaoHeader from './OpcaoHeader';
import { TAMANHO_DE_TELA_MOBILE } from '../../../config';
import { Link } from 'react-router-dom';

export default function OpcoesHeader() {

    const [modalSolicitacoesDeAmizadeAberto, setModalSolicitacoesDeAmizadeAberto] = useState<boolean>(false);
    const [modalMensagensAberto, setModalMensagensAberto] = useState<boolean>(false);
    const [modalNotificacoesAberto, setModalNotificacoesAberto] = useState<boolean>(false);

    const [indicadorLayoutMobile, setIndicadorLayoutMobile] = useState(false);

    useEffect(() => {
        verificaTamanhoDaTelaEMudaState();
        window.addEventListener('resize', () => {
            verificaTamanhoDaTelaEMudaState();
        })
    }, []);

    function verificaTamanhoDaTelaEMudaState() {
        if (window.innerWidth <= TAMANHO_DE_TELA_MOBILE) {
            setIndicadorLayoutMobile(true);
        } else {
            setIndicadorLayoutMobile(false);
        }
    }

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
                indicadorLayoutMobile &&
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
                indicadorLayoutMobile={indicadorLayoutMobile}
                caminhoParaLinkMobile='/solicitacoesDeAmizade'
                indicadorModalAbertoLayoutPc={modalSolicitacoesDeAmizadeAberto}
                funcaoAbrirModalLayoutPC={clickSolicitacoesDeAmizade}
            />
            <OpcaoHeader
                nomeDoIcone='chat_bubble'
                indicadorLayoutMobile={indicadorLayoutMobile}
                caminhoParaLinkMobile='/mensagens'
                indicadorModalAbertoLayoutPc={modalMensagensAberto}
                funcaoAbrirModalLayoutPC={clickMensagens}
            />
            <OpcaoHeader
                nomeDoIcone='notifications'
                indicadorLayoutMobile={indicadorLayoutMobile}
                caminhoParaLinkMobile='/notificacoes'
                indicadorModalAbertoLayoutPc={modalNotificacoesAberto}
                funcaoAbrirModalLayoutPC={clickNotificacoes}
            />
            <Link to='/perfil' className='opcoesHeaderIcone' id='opcoesHeaderIcone__perfil'>
                <img src="imagensDinamicas/perfil.jpg" alt="" />
            </Link>
            <ModalSolicitacoesDeAmizade aberto={modalSolicitacoesDeAmizadeAberto} clickFora={fecharModais} />
            <ModalMensagens aberto={modalMensagensAberto} clickFora={fecharModais} />
            <ModalNotificacoes aberto={modalNotificacoesAberto} clickFora={fecharModais} />
        </div>
    )
}
