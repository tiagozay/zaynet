import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './OpcaoHeader.css';

interface OpcaoHeaderProps {
    nomeDoIcone: string;
    indicadorLayoutMobile: boolean;
    caminhoParaLinkMobile?: string;
    indicadorModalAbertoLayoutPc?: boolean;
    funcaoAbrirModalLayoutPC?: () => void
}

export default function OpcaoHeader({
    nomeDoIcone,
    indicadorLayoutMobile,
    caminhoParaLinkMobile,
    indicadorModalAbertoLayoutPc,
    funcaoAbrirModalLayoutPC,
}: OpcaoHeaderProps) {
    const location = useLocation();

    //Recebe informação que indica se o tamanho de tela corresponde à mobile ou PC, de acordo com essa informação renderiza um elemento diferente para cada link: se for mobile renderiza um Link do react-router-dom e se for pc renderiza o icone que abre a janelinha modal
    return (
        indicadorLayoutMobile ?
            <Link className={`
                        material-symbols-outlined
                        opcoesHeaderIcone 
                        ${location.pathname === caminhoParaLinkMobile ? 'opcoesHeaderIconeLinkMobile__ativo' : ""}
                    `}
                to={caminhoParaLinkMobile ? caminhoParaLinkMobile : ""}>{nomeDoIcone}</Link> :
            <i className={`
                        material-symbols-outlined
                        opcoesHeaderIcone 
                        ${indicadorModalAbertoLayoutPc ? "opcoesHeaderIcone__ativo" : ""}
                    `} onClick={funcaoAbrirModalLayoutPC}>{nomeDoIcone}</i>
    )
}
