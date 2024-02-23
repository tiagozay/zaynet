import React, { useContext, useState } from 'react';
import './FeedPublicacoesUsuario.css';
import UsuarioService from '../../services/UsuarioService';
import { PerfilUsuarioContext } from '../../contexts/PerfilUsuarioContext';
import ListaDePublicacoes from '../../components/ListaDePublicacoes';
import { useNavigate } from 'react-router-dom';
import { FeedContext } from '../../contexts/FeedContext';
import { PublicacaoModel } from '../../models/Publicacao/PublicacaoModel';
import { PublicacaoCompartilhadaModel } from '../../models/Publicacao/PublicacaoCompartilhadaModel';

export default function FeedPublicacoesUsuario() {

    const navigate = useNavigate();

    const { definePosicaoDoFeed } = useContext(FeedContext);

    const {
        indicadorUsuarioCarregando,
        indicadorPublicacoesDoUsuarioCarregando,
        usuario,
        publicacoes,
        setPublicacoes,
        imagens,
    } = useContext(PerfilUsuarioContext);

    function aoClicarEmUmaImagemNaLateral(indice: number) {
        const info = {
            midias: imagens,
            indiceInicial: indice
        };

        definePosicaoDoFeed(window.scrollY)
            .then(() => { navigate('/image', { state: info }) });
    }

    //Função disparada pelo componente de ListaDePublicações quando alguma alteração no estado (como publicar) acontecer
    function atualizaPublicacoes(publicacoes: Array<PublicacaoModel | PublicacaoCompartilhadaModel>){
        setPublicacoes(publicacoes);
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
                                    {
                                        imagens.slice(0, 6).map((midia, index) => (
                                            <li 
                                                className='perfilUsuario__fotosLateral__listaDeFotos__foto' 
                                                key={midia.id}
                                                onClick={() => aoClicarEmUmaImagemNaLateral(index)}
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO_MINIATURA}${midia.caminhoMidiaMiniatura}`}
                                                    alt="Foto publicação"
                                                />
                                            </li>
                                        ))
                                    }
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
                            <ListaDePublicacoes
                                publicacoesParaListar={publicacoes}
                                aoMudarListaDePublicacoes={atualizaPublicacoes}
                            />
                    }
                </div>
            </section>
        </>
    )
}
