import React, { useContext, useEffect, useRef } from 'react';
import './CaixaDeMensagem.css';
import { CaixaDeMensagemContext } from '../../contexts/CaixaDeMensagemContext';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { MensagemRecebida } from '../../models/ConversaModel';

export default function CaixaDeMensagem() {
    const refContainerConversa = useRef<HTMLDivElement>(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const {
        estadoCaixaDeMensagem,
        conversaAberta,
        abrirChat,
        minimizarChat,
        fecharChat
    } = useContext(CaixaDeMensagemContext);

    useEffect(() => {
        if (isMobile) {
            fecharChat();
        }
    }, [isMobile])

    useEffect(() => {
        if (refContainerConversa.current) {
            refContainerConversa.current.scrollTop = refContainerConversa.current.scrollHeight;
        }
    }, [refContainerConversa]);

    function handleClickBtnAbrirConversaMinimizada() {
        abrirChat();
    }

    function handleClickBtnFecharConversaMinimizada(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.stopPropagation();
        fecharChat();
    }

    if (!estadoCaixaDeMensagem || isMobile) {
        return null
    } else if (estadoCaixaDeMensagem === 'Aberto') {
        return (
            <section id='caixaDeMensagem'>
                <div id='caixaDeMensagem__divPerfilENome'>
                    <img src={conversaAberta?.perfilAutor} id='caixaDeMensagem__perfil' alt='Foto perfil' />
                    <div id='caixaDeMensagem__divPerfilENome__container'>
                        <div id='caixaDeMensagem__divNomeEVistoPorUltimo'>
                            <p id='caixaDeMensagem__divNomeEVistoPorUltimo__nome'>{conversaAberta?.nomeAutor}</p>
                            <p id='caixaDeMensagem__divNomeEVistoPorUltimo__vistoPorUltimo'>
                                Online há {conversaAberta?.vistoPorUltimo}
                            </p>
                        </div>
                        <div id='caixaDeMensagem__divBtns'>
                            <button
                                id='caixaDeMensagem__btnMinimizar'
                                onClick={minimizarChat}
                            >
                                <div></div>
                            </button>
                            <button
                                className='material-symbols-outlined'
                                id='caixaDeMensagem__btnFechar'
                                onClick={fecharChat}
                            >close</button>
                        </div>

                    </div>
                </div>
                <div id='caixaDeMensagem__containerConversa' ref={refContainerConversa}>
                    <div id='caixaDeMensagem__containerConversa__conversa'>

                        {
                            conversaAberta?.mensagens.map(mensagem => {

                                if (mensagem instanceof MensagemRecebida) {
                                    return (
                                        <div id='caixaDeMensagem__conversa__mensagemRecebida'>
                                            <img
                                                src={mensagem.perfilAutor}
                                                id='caixaDeMensagem__mensagemRecebida__perfil'
                                                alt='Foto perfil'
                                            />
                                            <p id='caixaDeMensagem__mensagemRecebida__texto'>
                                                {mensagem.mensagem}
                                            </p>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div id='caixaDeMensagem__conversa__mensagemEnviada'>
                                            <p id='caixaDeMensagem__mensagemEnviada__texto'>
                                                {mensagem.mensagem}
                                            </p>
                                            <img
                                                src={mensagem.perfilAutor}
                                                id='caixaDeMensagem__mensagemEnviada__perfil'
                                                alt='Foto perfil'
                                            />
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>

                <div id='caixaDeMensagem__divInputEnviarMensagem'>
                    <input
                        type="text"
                        id='caixaDeMensagem__inputNovaMensagem'
                        placeholder='Digite uma mensagem'
                    />
                    <button
                        className='material-symbols-outlined'
                        id='caixaDeMensagem__btnEnviarMensagem'
                    >
                        send
                    </button>
                </div>

            </section>
        )
    } else if (estadoCaixaDeMensagem === 'Minimizado') {
        return (
            <section id='caixaDeMensagemMinimizada' onClick={handleClickBtnAbrirConversaMinimizada}>
                <div id='caixaDeMensagemMinimizada__containerInfo'>
                    <img
                        src={conversaAberta?.perfilAutor}
                        id='caixaDeMensagemMinimizada__perfil'
                        alt="Foto perfil"
                    />
                    <p id='caixaDeMensagemMinimizada__nome'>
                        {conversaAberta?.nomeAutor}
                    </p>
                </div>
                <button
                    className='material-symbols-outlined'
                    id='caixaDeMensagemMinimizada__btnFechar'
                    onClick={handleClickBtnFecharConversaMinimizada}
                >close</button>
            </section>
        );
    }


}
