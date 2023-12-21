import React, { useEffect, useState } from 'react';
import './PerfilUsuario.css';
import Header from '../../components/Header';
import MenuResponderSolicitacao from './MenuResponderSolicitacao';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import OpcoesAcoesUsuario from './OpcoesAcoesUsuario';
import { Usuario } from '../../models/Usuario';

export default function PerfilUsuario() {

    const usuario = new Usuario(
        2,
        "Pedro souza",
        852,
        false,
        false,
        false
    )

    return (
        <>
            <Header></Header>
            <section id='perfilDoUsuario__page'>
                <section id='perfilDoUsuario__secaoInformacoesDoUsuario'>
                    <div id='perfilDoUsuario__fotoDaCapa'>
                    </div>
                    <div id='perfilDoUsuario__perfilNomeEOpcoesDoUsuario'>
                        <img src="./imagensDinamicas/perfil.jpg" alt="" />
                        <div id='perfilDoUsuario__nomeEQuantidadeDeAmigos'>
                            <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__nome'>{usuario.nome}</p>
                            <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__amigos'>{usuario.quantidadeDeAmigos} amigos</p>
                        </div>

                        <OpcoesAcoesUsuario usuario={usuario} />
                    </div>

                    {
                        usuario.indicadorSolicitacaoDeAmizadeRecebida ?
                            <div id='perfilDoUsuario__avisoDeSolicitacaoRecebida'>
                                <p>Pedro enviou uma solicitação de amizade para você</p>
                                <div id='perfilDoUsuario__avisoDeSolicitacaoRecebida__opcoes'>
                                    <button id='perfilDoUsuario__avisoDeSolicitacaoRecebida__confirmar'>
                                        Confirmar solicitação
                                    </button>
                                    <button id='perfilDoUsuario__avisoDeSolicitacaoRecebida__excluir'>
                                        Excluir solicitação
                                    </button>
                                </div>
                            </div> :
                            ""
                    }

                </section>

                <section id='perfilUsuario__menuPerfil'>
                    <div id='perfilUsuario__linhaDivisoria'></div>
                    <ul id='perfilUsuario__menuPerfil__listaOpcoes'>
                        <li className='perfilUsuario__menuPerfil__listaOpcoes__opcao perfilUsuario__menuPerfil__listaOpcoes__opcaoAtiva'>Publicações</li>
                        <li className='perfilUsuario__menuPerfil__listaOpcoes__opcao'>Fotos</li>
                        <li className='perfilUsuario__menuPerfil__listaOpcoes__opcao'>Vídeos</li>
                        <li className='perfilUsuario__menuPerfil__listaOpcoes__opcao'>Amigos</li>
                    </ul>
                </section>

                <section id='perfilUsuario__containerPrincipal'>

                    <div id='perfilUsuario__containerInformacoesLaterais'>
                        <div id='perfilUsuario__apresentacaoLateral'>
                            <h3 id='perfilUsuario__informacoesLaterais__titulo'>Apresentação</h3>
                            <ul id='perfilUsuario__apresentacaoLateral__listaDeInformacoes'>
                                <li className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacao'>
                                    <i className='material-symbols-outlined'>home</i>
                                    Mora em <span id='informacaoUsuario__textoDestaque'>Cruz machado</span>
                                </li>
                                <li className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacao'>
                                    <i className='material-symbols-outlined'>location_on</i>
                                    De <span id='informacaoUsuario__textoDestaque'>São Paulo</span>
                                </li>
                                <li className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacao'>
                                    <i className='material-symbols-outlined'>favorite</i>
                                    Solteiro
                                </li>
                            </ul>
                        </div>

                        <div id='perfilUsuario__fotosLateral'>
                            <h3 id='perfilUsuario__informacoesLaterais__titulo'>Fotos</h3>
                            <ul id='perfilUsuario__fotosLateral__listaDeFotos'>
                                <li className='perfilUsuario__fotosLateral__listaDeFotos__foto'>
                                    <img src="./imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg" alt="Foto publicação" />
                                </li>
                                <li className='perfilUsuario__fotosLateral__listaDeFotos__foto'>
                                    <img src="./imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg" alt="Foto publicação" />
                                </li>
                                <li className='perfilUsuario__fotosLateral__listaDeFotos__foto'>
                                    <img src="./imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg" alt="Foto publicação" />
                                </li>
                                <li className='perfilUsuario__fotosLateral__listaDeFotos__foto'>
                                    <img src="./imagensDinamicas/publicacoes/miniaturasDasImagens/pub1.jpg" alt="Foto publicação" />
                                </li>
                                <li className='perfilUsuario__fotosLateral__listaDeFotos__foto'>
                                    <img src="./imagensDinamicas/publicacoes/miniaturasDasImagens/pub2.jpg" alt="Foto publicação" />
                                </li>
                                <li className='perfilUsuario__fotosLateral__listaDeFotos__foto'>
                                    <img src="./imagensDinamicas/publicacoes/miniaturasDasImagens/pub3.jpg" alt="Foto publicação" />
                                </li>
                            </ul>
                        </div>

                        <div id='perfilUsuario__amigosLateral'>
                            <h3 id='perfilUsuario__informacoesLaterais__titulo'>Amigos</h3>
                            <ul id='perfilUsuario__amigosLateral__listaDeAmigos'>
                                <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigo'>
                                    <img
                                        className='perfilUsuario__listaDeAmigos__perfilAmigo'
                                        src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário"
                                    />
                                    <p className='perfilUsuario__listaAmigos__nomeAmigo'>José Andrade</p>
                                </li>
                                <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigo'>
                                    <img
                                        className='perfilUsuario__listaDeAmigos__perfilAmigo'
                                        src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário"
                                    />
                                    <p className='perfilUsuario__listaAmigos__nomeAmigo'>José Andrade</p>
                                </li>
                                <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigo'>
                                    <img
                                        className='perfilUsuario__listaDeAmigos__perfilAmigo'
                                        src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário"
                                    />
                                    <p className='perfilUsuario__listaAmigos__nomeAmigo'>José Andrade</p>
                                </li>
                                <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigo'>
                                    <img
                                        className='perfilUsuario__listaDeAmigos__perfilAmigo'
                                        src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário"
                                    />
                                    <p className='perfilUsuario__listaAmigos__nomeAmigo'>Maria de souza da luz</p>
                                </li>
                                <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigo'>
                                    <img
                                        className='perfilUsuario__listaDeAmigos__perfilAmigo'
                                        src="./imagensDinamicas/perfil.jpg" alt="Perfil usuário"
                                    />
                                    <p className='perfilUsuario__listaAmigos__nomeAmigo'>José Andrade</p>
                                </li>
                                <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigo'>
                                    <img
                                        className='perfilUsuario__listaDeAmigos__perfilAmigo'
                                        src="./imagensDinamicas/perfil2.jpg" alt="Perfil usuário"
                                    />
                                    <p className='perfilUsuario__listaAmigos__nomeAmigo'>José Andrade</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </section>
        </>

    )
}
