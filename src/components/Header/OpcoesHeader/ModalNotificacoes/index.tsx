import React from 'react';
import './ModalNotificacoes.css';

interface ModalNotificacoesProps {
    aberto: boolean,
    clickFora: Function
}

export default function ModalNotificacoes({ aberto, clickFora }: ModalNotificacoesProps) {
    return (

        aberto ?
            <>
                <div className='modal-overlay' onClick={() => clickFora()}></div>
                <nav id='navNotificacoes' className='navOpcoesHeader'>
                    <h3 className='navOpcoesHeader__titulo'>
                        Notificações
                    </h3>
                    <ul id="listaDeNotificacoes">
                        <li className='listaDeNotificacoes__notificacao'>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="notificacao__perfil" />
                            <div id='notificacao__acao'>
                                <p>
                                    <span id='notificacao__acao__autor'>Tiago zay </span>
                                    Adicionou uma nova foto.
                                </p>
                            </div>
                        </li>
                        <li className='listaDeNotificacoes__notificacao'>
                            <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="notificacao__perfil" />
                            <div id='notificacao__acao'>
                                <p>
                                    <span id='notificacao__acao__autor'>Ervino zay </span>
                                    Comentou na sua publicação.
                                </p>
                            </div>
                        </li>
                    </ul>
                </nav>
            </>
            :
            <></>
    )
}
