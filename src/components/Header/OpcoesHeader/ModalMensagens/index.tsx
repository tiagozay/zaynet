import React from 'react';
import './ModalMensagens.css';

interface ModalMensagensProps {
    aberto: boolean,
    clickFora: Function
}

export default function ModalMensagens({ aberto, clickFora }: ModalMensagensProps) {
    return (
        aberto ?
            <>
                <div className='modal-overlay' onClick={() => clickFora()}></div>
                <nav id='navMensagens' className='navOpcoesHeader'>
                    <h3 className='navOpcoesHeader__titulo'>
                        Mensagens
                    </h3>
                    <ul id="listaDeMensagens">
                        <li className='listaDeMensagens__mensagem'>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="mensagem__perfil"/>
                            <div id='mensagem__informacoesPessoa'>
                                <p id='mensagem__informacoesPessoa__nome'>Pedro souza</p>
                                <p id='mensagem__informacoesPessoa__ultimaMensagem'>Vou ir lá de tarde</p>
                            </div>

                        </li>
                        <li className='listaDeMensagens__mensagem'>
                            <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="mensagem__perfil"/>
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
