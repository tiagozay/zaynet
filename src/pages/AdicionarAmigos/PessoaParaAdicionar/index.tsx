import React, { useState } from 'react';
import './PessoaParaAdicionar.css';

interface PessoaParaAdicionarProps{
    id: number,
    perfil: string,
    nome: string,
    amigosEmComum: number,
    clickAdicionarAmigo: (id: number) => void
}

export default function PessoaParaAdicionar({id, perfil, nome, amigosEmComum, clickAdicionarAmigo}: PessoaParaAdicionarProps) {

    const [indicadorSolicitacaoEnviada, setIndicadorSolicitacaoEnviada] = useState(false);

    function clickEnviarSolicitacao()
    {
        setIndicadorSolicitacaoEnviada(true);
    }

    return (
        <li id='adicionarAmigosPage__pessoa' onClick={() => clickAdicionarAmigo(id)}>
            <div id="adicionarAmigosPage__pessoa__container">
                <img src={perfil} alt="Perfil do usuário" id='pessoa__perfil' />
                <div id='pessoa__informacoesPessoa'>
                    <p id='pessoa__informacoesPessoa__nome'>{nome}</p>
                    <p id='pessoa__informacoesPessoa__amigosEmComum'>{amigosEmComum} amigos em comum</p>
                </div>
            </div>
            {
                indicadorSolicitacaoEnviada ? 
                <p id='adicionarAmigosPage__pessoa__msgSolicitacaoEnviada'>Solicitação enviada</p> : 
                <button id="adicionarAmigosPage__pessoa__btnAdicionar" onClick={clickEnviarSolicitacao}>Adicionar</button>
            }   
        </li>
    )
}
