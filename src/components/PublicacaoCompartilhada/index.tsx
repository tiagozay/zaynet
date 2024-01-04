import React from 'react';
import './PublicacaoCompartilhada.css';
import InteracoesComAPublicacao from '../Publicacao/InteracoesComAPublicacao';
import Comentarios from '../Publicacao/Comentarios';
import Publicacao from '../Publicacao';

export default function PublicacaoCompartilhada() {

    const publicacao = {
        nomeAutor: "Pedro souza",
        perfil: "./imagensDinamicas/perfil.jpg",
        tempoDePublicacao: "5 minutos",
        texto: "Isto é uma verdadeira obra de arte!",
    }

    return (
        <div id='publicacaoCompartilhada'>
            <div id='publicacaoCompartilhada__infoUsuario'>
                <div id='publicacaoCompartilhada__infoUsuarioContainer'>
                    <img src={publicacao.perfil} alt="Perfil usuário" id='publicacaoCompartilhada__perfil' />
                    <div id='publicacaoCompartilhada__infoUsuarioContainer__divInfo'>
                        <p id='publicacaoCompartilhada__tituloAutor'>
                            <span>Pedro souza </span>
                            compartilhou uma publicação
                        </p>
                        <p id='publicacaoCompartilhada__tempoDePublicacao'>Há {publicacao.tempoDePublicacao}</p>
                    </div>
                </div>
            </div>

            <p id='publicacaoCompartilhada__texto'>{publicacao.texto}</p>

            <div id='publicacaoCompartilhada__containerPublicacao'>
                <Publicacao publicacaoCompartilhada={true} />
            </div>


            <InteracoesComAPublicacao />

            <div id='publicacaoCompartilhada__linhaDivisoria'></div>
            <Comentarios />
        </div>
    )
}
