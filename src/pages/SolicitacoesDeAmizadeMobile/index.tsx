import React, { useEffect } from 'react';
import './SolicitacoesDeAmizadeMobile.css';
import { useNavigate } from 'react-router-dom';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import { useMediaQuery } from 'react-responsive';

export default function SolicitacoesDeAmizadeMobile() {
    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {
        if (!isMobile) {
            navigate('/');
        }
    }, [isMobile]);

    return (
        <section id='solicitacoesDeAmizadePage' className='espacamentosParaCompensarPartesDoHeader'>
            <h3 id='solicitacoesDeAmizadeMobile__titulo'>Solicitações de amizade</h3>
            <ul id="listaDeSolicitacoesDeAmizadeMobile">
                <li id='listaDeSolicitacoesDeAmizadeMobile__solicitacao'>
                    <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacaoMobile__perfil" />
                    <div id='solicitacaoMobile__informacoesPessoa'>
                        <p id='solicitacaoMobile__informacoesPessoa__nome'>Pedro souza</p>
                        <p id='solicitacaoMobile__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                    </div>
                    <div id='solicitacaoMobile__opcoes'>
                        <button id='solicitacaoMobile__opcoes__botaoRemover'>Remover</button>
                        <button id='solicitacaoMobile__opcoes__botaoAceitar'>Aceitar</button>
                    </div>
                </li>
                <li id='listaDeSolicitacoesDeAmizadeMobile__solicitacao'>
                    <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="solicitacaoMobile__perfil" />
                    <div id='solicitacaoMobile__informacoesPessoa'>
                        <p id='solicitacaoMobile__informacoesPessoa__nome'>Maria almeida</p>
                        <p id='solicitacaoMobile__informacoesPessoa__amigosEmComum'>102 amigos em comum</p>
                    </div>
                    <div id='solicitacaoMobile__opcoes'>
                        <button id='solicitacaoMobile__opcoes__botaoRemover'>Remover</button>
                        <button id='solicitacaoMobile__opcoes__botaoAceitar'>Aceitar</button>
                    </div>
                </li>
                <li id='listaDeSolicitacoesDeAmizadeMobile__solicitacao'>
                    <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacaoMobile__perfil" />
                    <div id='solicitacaoMobile__informacoesPessoa'>
                        <p id='solicitacaoMobile__informacoesPessoa__nome'>Pedro souza</p>
                        <p id='solicitacaoMobile__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                    </div>
                    <div id='solicitacaoMobile__opcoes'>
                        <button id='solicitacaoMobile__opcoes__botaoRemover'>Remover</button>
                        <button id='solicitacaoMobile__opcoes__botaoAceitar'>Aceitar</button>
                    </div>
                </li>
                <li id='listaDeSolicitacoesDeAmizadeMobile__solicitacao'>
                    <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacaoMobile__perfil" />
                    <div id='solicitacaoMobile__informacoesPessoa'>
                        <p id='solicitacaoMobile__informacoesPessoa__nome'>Pedro souza</p>
                        <p id='solicitacaoMobile__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                    </div>
                    <div id='solicitacaoMobile__opcoes'>
                        <button id='solicitacaoMobile__opcoes__botaoRemover'>Remover</button>
                        <button id='solicitacaoMobile__opcoes__botaoAceitar'>Aceitar</button>
                    </div>
                </li>
                <li id='listaDeSolicitacoesDeAmizadeMobile__solicitacao'>
                    <img src="/imagensDinamicas/perfil2.jpg" alt="Foto de perfil" id="solicitacaoMobile__perfil" />
                    <div id='solicitacaoMobile__informacoesPessoa'>
                        <p id='solicitacaoMobile__informacoesPessoa__nome'>Maria almeida</p>
                        <p id='solicitacaoMobile__informacoesPessoa__amigosEmComum'>102 amigos em comum</p>
                    </div>
                    <div id='solicitacaoMobile__opcoes'>
                        <button id='solicitacaoMobile__opcoes__botaoRemover'>Remover</button>
                        <button id='solicitacaoMobile__opcoes__botaoAceitar'>Aceitar</button>
                    </div>
                </li>
                <li id='listaDeSolicitacoesDeAmizadeMobile__solicitacao'>
                    <img src="/imagensDinamicas/perfil.jpg" alt="Foto de perfil" id="solicitacaoMobile__perfil" />
                    <div id='solicitacaoMobile__informacoesPessoa'>
                        <p id='solicitacaoMobile__informacoesPessoa__nome'>Pedro souza</p>
                        <p id='solicitacaoMobile__informacoesPessoa__amigosEmComum'>25 amigos em comum</p>
                    </div>
                    <div id='solicitacaoMobile__opcoes'>
                        <button id='solicitacaoMobile__opcoes__botaoRemover'>Remover</button>
                        <button id='solicitacaoMobile__opcoes__botaoAceitar'>Aceitar</button>
                    </div>
                </li>
            </ul>
        </section>
    )
}
