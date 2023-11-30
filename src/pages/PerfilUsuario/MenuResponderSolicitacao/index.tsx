import React, { useEffect, useRef, useState } from 'react';
import './MenuResponderSolicitacao.css';
import { tamanhoDeTelaMobile } from '../../../config';

interface MenuResponderSolicitacaoProps {
    indicadorMenuResponderSolicitacaoAberto: boolean,
    fecharMenu: () => void,
}

export default function MenuResponderSolicitacao({
    indicadorMenuResponderSolicitacaoAberto,
    fecharMenu
}: MenuResponderSolicitacaoProps) {

    const menuRef = useRef<HTMLDivElement>(null);

    const [indicadorTelaMobile, setIndicadorTelaMobile] = useState(false);

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

    useEffect(() => {

        if (window.innerWidth <= tamanhoDeTelaMobile) {
            setIndicadorTelaMobile(true);
        } else {
            setIndicadorTelaMobile(false);
        }

        const handleReajustarTela = () => {
            if (window.innerWidth <= tamanhoDeTelaMobile) {
                setIndicadorTelaMobile(true);
            } else {
                setIndicadorTelaMobile(false);
            }
        }

        window.addEventListener('resize', handleReajustarTela);

        return () => {
            window.removeEventListener('resize', handleReajustarTela);
        };

    }, []);

    return (

        indicadorMenuResponderSolicitacaoAberto &&

            indicadorTelaMobile ?

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
