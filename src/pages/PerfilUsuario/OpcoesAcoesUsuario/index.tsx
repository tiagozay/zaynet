import React, { useContext, useState } from 'react';
import './OpcoesAcoesUsuario.css';
import { Usuario } from '../../../models/Usuario';
import MenuResponderSolicitacao from '../MenuResponderSolicitacao';
import { ConversaModel, MensagemEnviada, MensagemRecebida } from '../../../models/ConversaModel';
import { CaixaDeMensagemContext } from '../../../contexts/CaixaDeMensagemContext';
import { useMediaQuery } from 'react-responsive';
import { TAMANHO_DE_TELA_MOBILE } from '../../../config';
import { useNavigate } from 'react-router-dom';

export default function OpcoesAcoesUsuario({ usuario }: { usuario: Usuario }) {

    const conversa = new ConversaModel(
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

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    const {abrirChat} = useContext(CaixaDeMensagemContext);

    const navigate = useNavigate();

    const [indicadorMenuResponderSolicitacaoAberto, setIndicadorMenuResponderSolicitacaoAberto] = useState(false);

    function abrirMenuResponderSolicitacao() {
        setIndicadorMenuResponderSolicitacaoAberto(true);
    }

    function fecharMenuResponderSolicitacao() {
        setIndicadorMenuResponderSolicitacaoAberto(false);
    }

    function clickAbrirConversa(conversa: ConversaModel)
    {
        abrirChat(conversa);
        if(isMobile){
            navigate('/conversa');
        }
    }

    //Mock para simular login do usuário
    const idUsuarioLogado = 1;

    let btnsOpcoesDoUsuario: React.JSX.Element;

    if (idUsuarioLogado === usuario.id) {
        btnsOpcoesDoUsuario = (
            <button id='perfilDoUsuario__btnEditarPerfil'>
                <i className='material-symbols-outlined'>edit</i>
                Editar perfil
            </button>
        );
    } else if (usuario.indicadorEhAmigo) {
        btnsOpcoesDoUsuario = (
            <>
                <button id='perfilDoUsuario__btnAmizadeConfirmada'>
                    <i className='material-symbols-outlined'>check</i>
                    Amigos
                </button>
                <button id='perfilDoUsuario__btnEnviarMensagemAzul' onClick={() => clickAbrirConversa(conversa)}>
                    <i className='material-symbols-outlined'>chat</i>
                    Mensagem
                </button>
            </>
        )
    } else if (usuario.indicadorSolicitacaoDeAmizadeRecebida) {
        btnsOpcoesDoUsuario = (
            <>
                {
                    indicadorMenuResponderSolicitacaoAberto &&
                    <MenuResponderSolicitacao
                        indicadorMenuResponderSolicitacaoAberto={indicadorMenuResponderSolicitacaoAberto}
                        fecharMenu={fecharMenuResponderSolicitacao}
                    />
                }
                <button id='perfilDoUsuario__btnAdicionarAmigo' onClick={abrirMenuResponderSolicitacao}>
                    <i className='material-symbols-outlined'>check</i>
                    Responder
                </button>
                <button id='perfilDoUsuario__btnEnviarMensagem' onClick={() => clickAbrirConversa(conversa)}>
                    <i className='material-symbols-outlined'>chat</i>
                    Mensagem
                </button>
            </>
        );
    } else if (usuario.indicadorUsuarioQuemEnviouASolicitacao) {
        btnsOpcoesDoUsuario = (
            <>
                <button id='perfilDoUsuario__btnAdicionarAmigo'>
                    <i className='material-symbols-outlined'>check</i>
                    Solicitação enviada!
                </button>
                <button id='perfilDoUsuario__btnEnviarMensagem' onClick={() => clickAbrirConversa(conversa)}>
                    <i className='material-symbols-outlined'>chat</i>
                    Mensagem
                </button>
            </>
        );
    } else if (!usuario.indicadorEhAmigo) {
        btnsOpcoesDoUsuario = (
            <>
                <button id='perfilDoUsuario__btnAdicionarAmigo'>
                    <i className='material-symbols-outlined'>group_add</i>
                    Adicionar amigo
                </button>
                <button id='perfilDoUsuario__btnEnviarMensagem' onClick={() => clickAbrirConversa(conversa)}>
                    <i className='material-symbols-outlined'>chat</i>
                    Mensagem
                </button>
            </>
        );
    } else {
        btnsOpcoesDoUsuario = (
            <>
            </>
        );
    }

    return (
        <div id='perfilDoUsuario__opcoesParaPefil'>
            {btnsOpcoesDoUsuario}
        </div>

    )
}
