import React, { useEffect, useRef, useState } from 'react';
import './MenuOpcoesPublicacao.css';

interface MenuOpcoesPublicacaoProps {
    clickEditarPublicacao: () => void,
    clickExluirPublicacao: () => void,
}

export default function MenuOpcoesPublicacao({
    clickEditarPublicacao, clickExluirPublicacao
}: MenuOpcoesPublicacaoProps) {

    const btnAbrirMenuDeOpcoesRef = useRef<HTMLButtonElement | null>(null);
    const menuOpcoesDaPublicacaoRef = useRef<HTMLDivElement | null>(null);

    const [indicadorMenuOpcoesPublicacaoAberto, setIndicadorMenuOpcoesPublicacaoAberto] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClickNoDocumento);

        return () => {
            document.removeEventListener('click', handleClickNoDocumento);
        };
    }, [indicadorMenuOpcoesPublicacaoAberto]);

    useEffect(() => {

        let handleEscKey = (event: KeyboardEvent) => {
            event.key === 'Escape' && fecharMenuOpcoesDaPublicacao();
        }

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    function handleClickNoDocumento(event: MouseEvent) {
        if (
            menuOpcoesDaPublicacaoRef.current &&
            !menuOpcoesDaPublicacaoRef.current.contains(event.target as Node) &&
            event.target !== btnAbrirMenuDeOpcoesRef.current
        ) {
            if (indicadorMenuOpcoesPublicacaoAberto) {
                fecharMenuOpcoesDaPublicacao();
            }
        }
    }

    function editarPublicacao()
    {
        fecharMenuOpcoesDaPublicacao();
        clickEditarPublicacao();
    }

    function excluirPublicacao()
    {
        fecharMenuOpcoesDaPublicacao();
        clickExluirPublicacao();
    }

    function clickAbrirMenuOpcoesDaPublicacao() {
        setIndicadorMenuOpcoesPublicacaoAberto( state => !state);
    }

    function fecharMenuOpcoesDaPublicacao() {
        setIndicadorMenuOpcoesPublicacaoAberto(false);
    }



    return (
        <div id='publicacao__divOpcoesPublicacao'>
            <button
                className='material-symbols-outlined'
                id='publicacao__btnOpcoesPublicacao'
                onClick={clickAbrirMenuOpcoesDaPublicacao}
                ref={btnAbrirMenuDeOpcoesRef}
            >
                more_vert
            </button>

            {
                indicadorMenuOpcoesPublicacaoAberto ?
                    <div id='publicacao__divOpcoesPublicacao__menuContainer' ref={menuOpcoesDaPublicacaoRef}>
                        <div id='publicacao__divOpcoesPublicacao__menuContainer__triangulo'>

                        </div>
                        <div id='publicacao__divOpcoesPublicacao__menu'>
                            <button
                                id='publicacao__btnEditarPublicacao'
                                onClick={editarPublicacao}
                            >
                                <i className='material-symbols-outlined'>edit</i>
                                Editar publicação
                            </button>
                            <button
                                id='publicacao__btnExcluirPublicacao'
                                onClick={excluirPublicacao}
                            >
                                <i className='material-symbols-outlined'>delete</i>
                                Excluír publicação
                            </button>
                        </div>
                    </div> : ""
            }
        </div>

    )
}
