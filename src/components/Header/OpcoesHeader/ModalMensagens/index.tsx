import React, { useContext } from 'react';
import './ModalMensagens.css';
import { ConversaModel, MensagemEnviada, MensagemRecebida } from '../../../../models/ConversaModel';
import { CaixaDeMensagemContext } from '../../../../contexts/CaixaDeMensagemContext';

interface ModalMensagensProps {
    aberto: boolean,
    clickFora: Function
}

export default function ModalMensagens({ aberto, clickFora }: ModalMensagensProps) {
    const conversa1 = new ConversaModel(
        'Maria Almeida',
        './imagensDinamicas/perfil2.jpg',
        '10 minutos',
        [
            new MensagemRecebida(
                './imagensDinamicas/perfil2.jpg',
                'Bom dia Pedro!'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil.jpg',
                'Bom dia Maria!'
            ),
        ]
    );

    const conversa2 = new ConversaModel(
        'Pedro souza',
        './imagensDinamicas/perfil.jpg',
        '1 hora',
        [
            new MensagemRecebida(
                './imagensDinamicas/perfil.jpg',
                'Bom dia Maria'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil2.jpg',
                'Bom dia Pedro'
            ),
            new MensagemRecebida(
                './imagensDinamicas/perfil.jpg',
                'É você que está vendendo um carro?'
            ),
            new MensagemEnviada(
                './imagensDinamicas/perfil2.jpg',
                'Sim sou eu mesma.'
            ),
        ]
    );

    const {abrirChat} = useContext(CaixaDeMensagemContext);

    function clickEmAlgumaConversa(conversa: ConversaModel)
    {
        abrirChat(conversa);
    }

    return (
        aberto ?
            <>
                <div className='modal-overlay' onClick={() => clickFora()}></div>
                <nav id='navMensagens' className='navOpcoesHeader'>
                    <h3 className='navOpcoesHeader__titulo'>
                        Mensagens
                    </h3>
                    <ul id="listaDeMensagens">
                        <li className='listaDeMensagens__mensagem' onClick={() => clickEmAlgumaConversa(conversa2)}>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="mensagem__perfil" />
                            <div id='mensagem__informacoesPessoa'>
                                <p id='mensagem__informacoesPessoa__nome'>Pedro souza</p>
                                <p id='mensagem__informacoesPessoa__ultimaMensagem'>Vou ir lá de tarde</p>
                            </div>

                        </li>
                        <li className='listaDeMensagens__mensagem' onClick={() => clickEmAlgumaConversa(conversa1)}>
                            <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="mensagem__perfil" />
                            <div id='mensagem__informacoesPessoa'>
                                <p id='mensagem__informacoesPessoa__nome'>Maria almeida</p>
                                <p id='mensagem__informacoesPessoa__ultimaMensagem'>Bom dia!</p>
                            </div>
                        </li>
                    </ul>
                </nav>
            </>
            :
            <></>
    )
}
