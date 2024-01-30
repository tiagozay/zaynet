import React, { useState } from 'react';
import './InteracoesComAPublicacao.css';
import { PublicacaoModel } from '../../../models/Publicacao/PublicacaoModel';
import { APIService } from '../../../services/APIService';
import UsuarioService from '../../../services/UsuarioService';
import { PublicacaoFactory } from '../../../services/PublicacaoFactory';

interface InteracoesComAPublicacaoProps {
    publicacao: PublicacaoModel,
    quantidadeDeComentarios: number,
    quantidadeDeCurtidas: number,
    setQuantidadeDeCurtidas: React.Dispatch<React.SetStateAction<number>>,
    compartilharPublicacao: () => void
}

export default function InteracoesComAPublicacao({ publicacao, quantidadeDeComentarios, quantidadeDeCurtidas, setQuantidadeDeCurtidas, compartilharPublicacao }: InteracoesComAPublicacaoProps) {

    const idUsuarioLogado = UsuarioService.obtemIdUsuarioLogado();

    const [indicarUsuarioJaCurtiuPublicacao, setIndicarUsuarioJaCurtiuPublicacao] = useState(
        publicacao.curtidas?.some(curtida => curtida.autor.id === idUsuarioLogado) ? true : false
    );


    function curtirPublicacao() {

        if(indicarUsuarioJaCurtiuPublicacao){
            setQuantidadeDeCurtidas(
                quantidadeDeCurtidas => quantidadeDeCurtidas - 1
            );
        }else{
            setQuantidadeDeCurtidas(
                quantidadeDeCurtidas => quantidadeDeCurtidas + 1
            );
        }

        setIndicarUsuarioJaCurtiuPublicacao(
            indicarUsuarioJaCurtiuPublicacao => !indicarUsuarioJaCurtiuPublicacao
        );

        APIService.postTeste(`publicacoes/${publicacao.id}/curtir`, {})

    }

    return (
        <>
            <div id='publicacao__quantidadeDeInteracoes'>
                <div className='publicacao__quantidadeDeInteracoes__interacao' id='interacaoLike'>
                    <i className='material-symbols-outlined'>thumb_up</i>
                    <span>{quantidadeDeCurtidas}</span>
                </div>
                <div id='publicacao__quantidadeDeInteracoes__container'>
                    <div className='publicacao__quantidadeDeInteracoes__interacao'>
                        <span>{quantidadeDeComentarios}</span>
                        <i className='material-symbols-outlined'>chat_bubble</i>
                    </div>
                    <div className='publicacao__quantidadeDeInteracoes__interacao'>
                        <span>2</span>
                        <i className='material-symbols-outlined'>share</i>
                    </div>
                </div>

            </div>

            <div id='publicacao__linhaDivisoria'></div>
            <div id='publicacao__opcoesDeInteracao'>
                <button onClick={curtirPublicacao} className={indicarUsuarioJaCurtiuPublicacao ? 'publicacao__opcoesDeInteracaoLikeSelecionado' : ""}>
                    <i className='material-symbols-outlined'>thumb_up</i>
                    Curtir
                </button>
                <button>
                    <i className='material-symbols-outlined'>chat_bubble</i>
                    Comentar
                </button>
                <button onClick={compartilharPublicacao}>
                    <i className='material-symbols-outlined'>share</i>
                    Compartilhar
                </button>
            </div>
        </>
    )
}
