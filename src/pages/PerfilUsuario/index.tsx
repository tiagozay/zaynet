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
        "Tiago zay",
        852,
        false,
        true,
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
                                <p>Tiago enviou uma solicitação de amizade para você</p>
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

            </section>
        </>

    )
}
