import React from 'react';
import './ModalSolicitacoesDeAmizade.css';

interface ModalSolicitacoesDeAmizadeProps {
    aberto: boolean,
    clickFora: Function
}

export default function ModalSolicitacoesDeAmizade({ aberto, clickFora }: ModalSolicitacoesDeAmizadeProps) {
    return (

        aberto ?
            <>
                <div className='modal-overlay' onClick={() => clickFora()}></div>
                <nav id='navSolicitacoesDeAmizade' className='navOpcoesHeader'>
                    <h3 className='navOpcoesHeader__titulo'>
                        Solicitações de amizade
                    </h3>
                    <ul id="listaDeSolicitacoesDeAmizade">
                        <li id='listaDeSolicitacoesDeAmizade__solicitacao'>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacao__perfil" />
                            <div id='solicitacao__informacoesPessoa'>
                                <p id='solicitacao__informacoesPessoa__nome'>Tiago zay</p>
                                <p id='solicitacao__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                            </div>
                            <div id='solicitacao__opcoes'>
                                <button id='solicitacao__opcoes__botaoRemover'>Remover</button>
                                <button id='solicitacao__opcoes__botaoAceitar'>Aceitar</button>
                            </div>
                        </li>
                        <li id='listaDeSolicitacoesDeAmizade__solicitacao'>
                            <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="solicitacao__perfil" />
                            <div id='solicitacao__informacoesPessoa'>
                                <p id='solicitacao__informacoesPessoa__nome'>Ervino zay</p>
                                <p id='solicitacao__informacoesPessoa__amigosEmComum'>102 amigos em comum</p>
                            </div>
                            <div id='solicitacao__opcoes'>
                                <button id='solicitacao__opcoes__botaoRemover'>Remover</button>
                                <button id='solicitacao__opcoes__botaoAceitar'>Aceitar</button>
                            </div>
                        </li>
                        <li id='listaDeSolicitacoesDeAmizade__solicitacao'>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacao__perfil" />
                            <div id='solicitacao__informacoesPessoa'>
                                <p id='solicitacao__informacoesPessoa__nome'>Tiago zay</p>
                                <p id='solicitacao__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                            </div>
                            <div id='solicitacao__opcoes'>
                                <button id='solicitacao__opcoes__botaoRemover'>Remover</button>
                                <button id='solicitacao__opcoes__botaoAceitar'>Aceitar</button>
                            </div>
                        </li>
                        <li id='listaDeSolicitacoesDeAmizade__solicitacao'>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacao__perfil" />
                            <div id='solicitacao__informacoesPessoa'>
                                <p id='solicitacao__informacoesPessoa__nome'>Tiago zay</p>
                                <p id='solicitacao__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                            </div>
                            <div id='solicitacao__opcoes'>
                                <button id='solicitacao__opcoes__botaoRemover'>Remover</button>
                                <button id='solicitacao__opcoes__botaoAceitar'>Aceitar</button>
                            </div>
                        </li>
                        <li id='listaDeSolicitacoesDeAmizade__solicitacao'>
                            <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="solicitacao__perfil" />
                            <div id='solicitacao__informacoesPessoa'>
                                <p id='solicitacao__informacoesPessoa__nome'>Ervino zay</p>
                                <p id='solicitacao__informacoesPessoa__amigosEmComum'>102 amigos em comum</p>
                            </div>
                            <div id='solicitacao__opcoes'>
                                <button id='solicitacao__opcoes__botaoRemover'>Remover</button>
                                <button id='solicitacao__opcoes__botaoAceitar'>Aceitar</button>
                            </div>
                        </li>
                        <li id='listaDeSolicitacoesDeAmizade__solicitacao'>
                            <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacao__perfil" />
                            <div id='solicitacao__informacoesPessoa'>
                                <p id='solicitacao__informacoesPessoa__nome'>Tiago zay</p>
                                <p id='solicitacao__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                            </div>
                            <div id='solicitacao__opcoes'>
                                <button id='solicitacao__opcoes__botaoRemover'>Remover</button>
                                <button id='solicitacao__opcoes__botaoAceitar'>Aceitar</button>
                            </div>
                        </li>
                    </ul>
                </nav>
            </>
            :
            <></>
    )
}
