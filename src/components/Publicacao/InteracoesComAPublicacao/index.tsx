import React from 'react';
import './InteracoesComAPublicacao.css';

export default function InteracoesComAPublicacao() {
    return (
        <>
            <div id='publicacao__quantidadeDeInteracoes'>
                <div className='publicacao__quantidadeDeInteracoes__interacao' id='interacaoLike'>
                    <i className='material-symbols-outlined'>thumb_up</i>
                    <span>5</span>
                </div>
                <div id='publicacao__quantidadeDeInteracoes__container'>
                    <div className='publicacao__quantidadeDeInteracoes__interacao'>
                        <span>2</span>
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
                <button>
                    <i className='material-symbols-outlined'>thumb_up</i>
                    Curtir
                </button>
                <button>
                    <i className='material-symbols-outlined'>chat_bubble</i>
                    Comentar
                </button>
                <button>
                    <i className='material-symbols-outlined'>share</i>
                    Compartilhar
                </button>
            </div>
        </>
    )
}
