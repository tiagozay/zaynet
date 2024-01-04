import React, { useContext, useEffect, useRef } from 'react';
import './CaixaDeMensagensMobile.css';
import { useNavigate } from 'react-router-dom';
import { CaixaDeMensagemContext } from '../../contexts/CaixaDeMensagemContext';
import { MensagemRecebida } from '../../models/ConversaModel';

export default function CaixaDeMensagensMobile() {
    const refContainerConversa = useRef<HTMLDivElement>(null);

    const { conversaAberta } = useContext(CaixaDeMensagemContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (refContainerConversa.current) {
            refContainerConversa.current.scrollTop = 9999;
        }
    }, [refContainerConversa]);

    document.body.style.overflowY = 'hidden';

    function clickFecharConversa() {
        navigate(-1);
    }

    return (
        <section id='caixaDeMensagensMobile__page'>
            <div id='caixaDeMensagensMobile__divPerfilENome'>
                <img src={conversaAberta?.perfilAutor} id='caixaDeMensagensMobile__perfil' alt='Foto perfil' />
                <div id='caixaDeMensagensMobile__divPerfilENome__container'>
                    <div id='caixaDeMensagensMobile__divNomeEVistoPorUltimo'>
                        <p id='caixaDeMensagensMobile__divNomeEVistoPorUltimo__nome'>{conversaAberta?.nomeAutor}</p>
                        <p id='caixaDeMensagensMobile__divNomeEVistoPorUltimo__vistoPorUltimo'>
                            Online há {conversaAberta?.vistoPorUltimo}
                        </p>
                    </div>
                    <div id='caixaDeMensagensMobile__divBtns'>
                        <button
                            className='material-symbols-outlined'
                            id='caixaDeMensagensMobile__btnFechar'
                            onClick={clickFecharConversa}
                        >close</button>
                    </div>

                </div>
            </div>
            <div id='caixaDeMensagensMobile__containerConversa' ref={refContainerConversa}>
                <div id='caixaDeMensagensMobile__containerConversa__conversa'>

                    {
                        conversaAberta?.mensagens.map(mensagem => {

                            if (mensagem instanceof MensagemRecebida) {
                                return (
                                    <div id='caixaDeMensagensMobile__conversa__mensagemRecebida'>
                                        <img
                                            src={mensagem.perfilAutor}
                                            id='caixaDeMensagensMobile__mensagemRecebida__perfil'
                                            alt='Foto perfil'
                                        />
                                        <p id='caixaDeMensagensMobile__mensagemRecebida__texto'>
                                            {mensagem.mensagem}
                                        </p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div id='caixaDeMensagensMobile__conversa__mensagemEnviada'>
                                        <p id='caixaDeMensagensMobile__mensagemEnviada__texto'>
                                            {mensagem.mensagem}
                                        </p>
                                        <img
                                            src={mensagem.perfilAutor}
                                            id='caixaDeMensagensMobile__mensagemEnviada__perfil'
                                            alt='Foto perfil'
                                        />
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
            <div id='caixaDeMensagensMobile__divInputEnviarMensagem'>
                <input
                    type="text"
                    id='caixaDeMensagensMobile__inputNovaMensagem'
                    placeholder='Digite uma mensagem'
                />
                <button
                    className='material-symbols-outlined'
                    id='caixaDeMensagensMobile__btnEnviarMensagem'
                >
                    send
                </button>
            </div>
        </section>
    )
}
