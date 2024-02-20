import React, { useContext, useEffect, useState } from 'react';
import './PerfilUsuario.css';
import Header from '../../components/Header';
import MenuResponderSolicitacao from './MenuResponderSolicitacao';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import OpcoesAcoesUsuario from './OpcoesAcoesUsuario';
import { Usuario } from '../../models/Usuario';
import Publicacao from '../../components/Publicacao';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ModalEditarInformacoesDoPerfil from '../../components/ModalEditarInformacoesDoPerfil';
import { useMediaQuery } from 'react-responsive';
import { ControleLoginContext } from '../../contexts/ControleLoginContext';
import { LoginService } from '../../services/LoginService';
import { APIService } from '../../services/APIService';
import { PerfilUsuarioContext } from '../../contexts/PerfilUsuarioContext';
import UsuarioService from '../../services/UsuarioService';
import { PublicacaoFactory } from '../../services/PublicacaoFactory';

export default function PerfilUsuario() {

    // const usuario = new Usuario(
    //     1,
    //     "Pedro",
    //     "souza",
    //     852,
    //     false,
    //     false,
    //     false,
    //     'aa',
    //     'aa',
    //     'aa',
    // );

    const id = useParams().id;

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const [indicadorModalEditarPefilAberto, setIndicadorModalEditarPefilAberto] = useState(false);

    const {
        indicadorUsuarioCarregando,
        setIndicadorUsuarioCarregando,
        usuario,
        setUsuario,
        publicacoes,
        setPublicacoes
    } = useContext(PerfilUsuarioContext);



    const { permisaoParaIniciar, setPermisaoParaIniciar } = useContext(ControleLoginContext);

    const navigate = useNavigate();

    const paginaAberta = useLocation().pathname;

    useEffect(() => {
        window.scrollTo(0, 0);

        setIndicadorUsuarioCarregando(true);

        APIService.get(`usuarios/${id}`)
            .then((res: any) => {

                const objetoUsuario = res.data;

                const usuario = new Usuario(
                    objetoUsuario.id,
                    objetoUsuario.nome,
                    objetoUsuario.sobrenome,
                    objetoUsuario.nomeFotoPerfil,
                    objetoUsuario.nomeMiniaturaFotoPerfil,
                    objetoUsuario.nomeFotoCapa,
                    objetoUsuario.dataDeNascimento,
                    objetoUsuario.genero,
                    objetoUsuario.cidadeNatal,
                    objetoUsuario.cidadeAtual,
                    objetoUsuario.statusDeRelacionamento
                );

                setUsuario(usuario);
                // setIndicadorUsuarioCarregando(false);
            })

        APIService.get(`publicacoes/usuarios/${id}`)
        .then( (res) => {

            const objetosPublicacoes = res.data;

            const publicacoes = objetosPublicacoes?.map( (objetoPublicacao: any) => {
                return PublicacaoFactory.create(objetoPublicacao);
            } )

            setPublicacoes(publicacoes);

        } )
    }, []);

    useEffect(() => {
        if (indicadorModalEditarPefilAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [indicadorModalEditarPefilAberto]);

    useEffect(() => {
        LoginService.verificaSeHaLoginValido()
            .then(loginValido => {
                if (loginValido) {
                    setPermisaoParaIniciar(true);
                } else {
                    navigate('/login');
                }
            })
            .catch(() => { })
    }, [permisaoParaIniciar]);

    function abrirModalEditarPerfil() {
        if (isMobile) {
            navigate("/editarPerfil");
        } else {
            setIndicadorModalEditarPefilAberto(true);
        }
    }

    function fecharModalEditarPerfil() {
        setIndicadorModalEditarPefilAberto(false);
    }

    return (
        permisaoParaIniciar &&
        <>
            {
                indicadorModalEditarPefilAberto ?
                    <ModalEditarInformacoesDoPerfil
                        modalAberto={indicadorModalEditarPefilAberto}
                        fecharModal={fecharModalEditarPerfil}
                    /> : ""
            }

            <Header></Header>

            <section id='perfilDoUsuario__page'>

                {
                    indicadorUsuarioCarregando ?
                        <section id='perfilDoUsuario__secaoInformacoesDoUsuario'>
                            <div id='perfilDoUsuario__fotoDaCapaCarregando'>
                            </div>
                            <div id='perfilDoUsuario__perfilNomeEOpcoesDoUsuario'>
                                <div id='perfilDoUsuario__fotoPerfilCarregando'></div>
                                <div id='perfilDoUsuario__nomeEQuantidadeDeAmigos'>
                                    <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__nomeCarregando'></p>
                                    <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__amigosCarregando'></p>
                                </div>
                            </div>
                        </section>
                        :
                        <section id='perfilDoUsuario__secaoInformacoesDoUsuario'>

                            {
                                usuario?.nomeCapa ?
                                    <img
                                        src={UsuarioService.obtemCaminhoCompletoDaCapaDoUsuario(usuario as Usuario) as string}
                                        alt="Foto capa"
                                        id='perfilDoUsuario__secaoInformacoesDoUsuario__fotoCapa'
                                    /> :
                                    <div id='perfilDoUsuario__fotoDaCapa'>
                                    </div>
                            }

                            <div id='perfilDoUsuario__perfilNomeEOpcoesDoUsuario'>
                                <img
                                    src={UsuarioService.obtemCaminhoCompletoDoPerfilDoUsuario(usuario as Usuario)}
                                    alt="Perfil usuário"
                                />
                                <div id='perfilDoUsuario__nomeEQuantidadeDeAmigos'>
                                    <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__nome'>{usuario?.nome} {usuario?.sobrenome}</p>
                                    <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__amigos'>{15} amigos</p>
                                </div>

                                <OpcoesAcoesUsuario
                                    usuario={usuario as Usuario}
                                    editarPerfil={abrirModalEditarPerfil}
                                />
                            </div>

                            {/* {
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
                            } */}

                        </section>

                }

                <section id='perfilUsuario__menuPerfil'>
                    <div id='perfilUsuario__linhaDivisoria'></div>
                    <ul id='perfilUsuario__menuPerfil__listaOpcoes'>
                        <li className={
                            `perfilUsuario__menuPerfil__listaOpcoes__opcao 
                            ${paginaAberta === '/perfil' && 'perfilUsuario__menuPerfil__listaOpcoes__opcaoAtiva'}`
                        }
                            onClick={() => navigate('/perfil')}
                        >
                            Publicações
                        </li>
                        <li className={
                            `perfilUsuario__menuPerfil__listaOpcoes__opcao 
                            ${paginaAberta === '/perfil/fotos' && 'perfilUsuario__menuPerfil__listaOpcoes__opcaoAtiva'}`
                        }
                            onClick={() => navigate('/perfil/fotos')}
                        >
                            Fotos
                        </li>
                        <li className={
                            `perfilUsuario__menuPerfil__listaOpcoes__opcao 
                            ${paginaAberta === '/perfil/videos' && 'perfilUsuario__menuPerfil__listaOpcoes__opcaoAtiva'}`
                        }
                            onClick={() => navigate('/perfil/videos')}
                        >
                            Vídeos
                        </li>
                        <li className={
                            `perfilUsuario__menuPerfil__listaOpcoes__opcao 
                            ${paginaAberta === '/perfil/amigos' && 'perfilUsuario__menuPerfil__listaOpcoes__opcaoAtiva'}`
                        }
                            onClick={() => navigate('/perfil/amigos')}
                        >
                            Amigos
                        </li>
                    </ul>
                </section>

                <Outlet />

            </section>
        </>

    )
}
