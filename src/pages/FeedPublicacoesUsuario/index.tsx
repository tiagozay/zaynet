import React, { useContext, useState } from 'react';
import './FeedPublicacoesUsuario.css';
import Publicacao from '../../components/Publicacao';
import UsuarioService from '../../services/UsuarioService';
import { PerfilUsuarioContext } from '../../contexts/PerfilUsuarioContext';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';
import PublicacaoCompartilhada from '../../components/PublicacaoCompartilhada';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';

export default function FeedPublicacoesUsuario() {

    const {
        indicadorUsuarioCarregando,
        indicadorPublicacoesDoUsuarioCarregando,
        usuario,
        publicacoes
    } = useContext(PerfilUsuarioContext);

    function abrirEdicaoPublicacao(publicacao: PublicacaoModel | PublicacaoCompartilhadaModel) {

    }

    function abrirCompartilhamento(publicacao: PublicacaoModel) {

    }

    return (

        <>
            <section id='perfilUsuario__containerPrincipal'>
                {
                    indicadorUsuarioCarregando ?
                        <div id='perfilUsuario__containerInformacoesLaterais'>
                            <div id='perfilUsuario__apresentacaoLateral'>
                                <h3 id='perfilUsuario__informacoesLaterais__titulo'>Apresentação</h3>
                                <ul id='perfilUsuario__apresentacaoLateral__listaDeInformacoes'>
                                    <li
                                        className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacaoCarregando'
                                    >
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li
                                        className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacaoCarregando'
                                    >
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li
                                        className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacaoCarregando'
                                    >
                                        <div></div>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>

                            <div id='perfilUsuario__fotosLateral'>
                                <h3 id='perfilUsuario__informacoesLaterais__titulo'>Fotos</h3>
                                <ul id='perfilUsuario__fotosLateral__listaDeFotos'>
                                    <li className='perfilUsuario__fotosLateral__listaDeFotos__fotoCarregando'>
                                    </li>
                                    <li className='perfilUsuario__fotosLateral__listaDeFotos__fotoCarregando'>
                                    </li>
                                    <li className='perfilUsuario__fotosLateral__listaDeFotos__fotoCarregando'>
                                    </li>
                                    <li className='perfilUsuario__fotosLateral__listaDeFotos__fotoCarregando'>
                                    </li>
                                    <li className='perfilUsuario__fotosLateral__listaDeFotos__fotoCarregando'>
                                    </li>
                                    <li className='perfilUsuario__fotosLateral__listaDeFotos__fotoCarregando'>
                                    </li>
                                </ul>
                            </div>

                            <div id='perfilUsuario__amigosLateral'>
                                <h3 id='perfilUsuario__informacoesLaterais__titulo'>Amigos</h3>
                                <ul id='perfilUsuario__amigosLateral__listaDeAmigos'>
                                    <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigoCarregando'>
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigoCarregando'>
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigoCarregando'>
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigoCarregando'>
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigoCarregando'>
                                        <div></div>
                                        <span></span>
                                    </li>
                                    <li className='perfilUsuario__amigosLateral__listaDeAmigos__amigoCarregando'>
                                        <div></div>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        :
                        <div id='perfilUsuario__containerInformacoesLaterais'>
                            <div id='perfilUsuario__apresentacaoLateral'>
                                <h3 id='perfilUsuario__informacoesLaterais__titulo'>Apresentação</h3>
                                <ul id='perfilUsuario__apresentacaoLateral__listaDeInformacoes'>
                                    <li className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacao'>
                                        <i className='material-symbols-outlined'>home</i>
                                        Mora em
                                        <span id='informacaoUsuario__textoDestaque'>
                                            {usuario?.cidadeAtual}
                                        </span>
                                    </li>
                                    <li className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacao'>
                                        <i className='material-symbols-outlined'>location_on</i>
                                        De
                                        <span id='informacaoUsuario__textoDestaque'>
                                            {usuario?.cidadeNatal}
                                        </span>
                                    </li>
                                    <li className='perfilUsuario__apresentacaoLateral__listaDeInformacoes__informacao'>
                                        <i className='material-symbols-outlined'>favorite</i>
                                        {usuario?.statusDeRelacionamento}
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
                                            src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil usuário"
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
                                            src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil usuário"
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
                                            src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()} alt="Perfil usuário"
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
                }

                <div id='perfilUsuario__feed'>
                    <h3 id='perfilUsuario__feed__titulo'>
                        Publicações
                    </h3>

                    {
                        indicadorPublicacoesDoUsuarioCarregando ?
                            <div id='paginaUsuario__feed__publicacaoCarregando'>
                                <div id='paginaUsuario__feed__publicacaoCarregando__containerInfo'>
                                    <div id="paginaUsuario__feed__publicacaoCarregando__perfil"></div>
                                    <div id="paginaUsuario__feed__publicacaoCarregando__nome"></div>
                                </div>
                            </div>
                            :
                            publicacoes.map(publicacao => {
                                if (publicacao instanceof PublicacaoCompartilhadaModel) {
                                    return <PublicacaoCompartilhada
                                        key={publicacao.id}
                                        publicacao={publicacao}
                                        compartilharPublicacao={abrirCompartilhamento}
                                        editarPublicacao={abrirEdicaoPublicacao}
                                    />
                                } else {
                                    return <Publicacao
                                        key={publicacao.id}
                                        publicacao={publicacao}
                                        compartilharPublicacao={abrirCompartilhamento}
                                        editarPublicacao={abrirEdicaoPublicacao}
                                    />
                                }
                            })

                    }
                </div>
            </section>
        </>
    )
}
