import React, { useEffect, useState } from 'react';
import './PerfilUsuario.css';
import Header from '../../components/Header';
import MenuResponderSolicitacao from './MenuResponderSolicitacao';
import { TAMANHO_DE_TELA_MOBILE } from '../../config';
import OpcoesAcoesUsuario from './OpcoesAcoesUsuario';
import { Usuario } from '../../models/Usuario';
import Publicacao from '../../components/Publicacao';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ModalEditarInformacoesDoPerfil from '../../components/ModalEditarInformacoesDoPerfil';
import { useMediaQuery } from 'react-responsive';

export default function PerfilUsuario() {

    const usuario = new Usuario(
        1,
        "Pedro",
        "souza",
        852,
        false,
        false,
        false,
        'aa',
        'aa',
        'aa',
    );

    const isMobile = useMediaQuery({maxWidth: TAMANHO_DE_TELA_MOBILE});

    const [indicadorModalEditarPefilAberto, setIndicadorModalEditarPefilAberto] = useState(false);

    const navigate = useNavigate();

    const paginaAberta = useLocation().pathname;

    useEffect(() => {
        if (indicadorModalEditarPefilAberto) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [indicadorModalEditarPefilAberto]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function abrirModalEditarPerfil() {
        if(isMobile){
            navigate("/editarPerfil");
        }else{
            setIndicadorModalEditarPefilAberto(true);
        }
    }

    function fecharModalEditarPerfil() {
        setIndicadorModalEditarPefilAberto(false);
    }

    return (
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
                <section id='perfilDoUsuario__secaoInformacoesDoUsuario'>
                    <div id='perfilDoUsuario__fotoDaCapa'>
                    </div>
                    <div id='perfilDoUsuario__perfilNomeEOpcoesDoUsuario'>
                        <img src="./../imagensDinamicas/perfil.jpg" alt="" />
                        <div id='perfilDoUsuario__nomeEQuantidadeDeAmigos'>
                            <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__nome'>{usuario.nome}</p>
                            <p id='perfilDoUsuario__nomeEQuantidadeDeAmigos__amigos'>{usuario.quantidadeDeAmigos} amigos</p>
                        </div>

                        <OpcoesAcoesUsuario
                            usuario={usuario}
                            editarPerfil={abrirModalEditarPerfil}
                        />
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
