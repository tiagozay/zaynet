import React, { useEffect, useRef, useState } from 'react';
import './MenuResponderSolicitacao.css';
import { TAMANHO_DE_TELA_MOBILE } from '../../../config';
import { useMediaQuery } from 'react-responsive';

interface MenuResponderSolicitacaoProps {
    indicadorMenuResponderSolicitacaoAberto: boolean,
    fecharMenu: () => void,
}

export default function MenuResponderSolicitacao({
    indicadorMenuResponderSolicitacaoAberto,
    fecharMenu
}: MenuResponderSolicitacaoProps) {

    const menuRef = useRef<HTMLDivElement>(null);

    const isMobile = useMediaQuery({ maxWidth: TAMANHO_DE_TELA_MOBILE });

    useEffect(() => {

        const handleClickForaDoMenu = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                fecharMenu();
            }
        };

        document.addEventListener('mousedown', handleClickForaDoMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickForaDoMenu);
        };

    }, [menuRef]);

    return (

        indicadorMenuResponderSolicitacaoAberto &&

            isMobile ?

            <div id='perfilDoUsuario__menuInferiorResponderSolicitacao' ref={menuRef}>
                <button>Confirmar</button>
                <button>Excluir solicitação</button>
            </div>

            :

            <div id='perfilDoUsuario__menuResponderSolicitacao' ref={menuRef}>
                <div id='perfilDoUsuario__menuResponderSolicitacao__container'>
                    <button>Confirmar</button>
                    <button>Excluir solicitação</button>
                </div>
                <div id='perfilDoUsuario__menuResponderSolicitacao__triangulo'>

                </div>
            </div>
    );
}
