import React, { useState } from 'react';
import './OpcoesAcoesUsuario.css';
import { Usuario } from '../../../models/Usuario';
import MenuResponderSolicitacao from '../MenuResponderSolicitacao';

export default function OpcoesAcoesUsuario({ usuario }: { usuario: Usuario }) {

    const [indicadorMenuResponderSolicitacaoAberto, setIndicadorMenuResponderSolicitacaoAberto] = useState(false);

    function abrirMenuResponderSolicitacao() {
        setIndicadorMenuResponderSolicitacaoAberto(true);
    }

    function fecharMenuResponderSolicitacao() {
        setIndicadorMenuResponderSolicitacaoAberto(false);
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
                <button id='perfilDoUsuario__btnEnviarMensagemAzul'>
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
                <button id='perfilDoUsuario__btnEnviarMensagem'>
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
                <button id='perfilDoUsuario__btnEnviarMensagem'>
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
                <button id='perfilDoUsuario__btnEnviarMensagem'>
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
